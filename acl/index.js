module.exports = class Acl
{
  constructor()
  {
    this.roles = {}
  }

  static from(roles)
  {
    const acl = new Acl

    for(const role in roles)
      for(const key in roles[role])
        switch(key)
        {
          case 'users':
            for(const user of roles[role].users)
              acl.addRoleUser(role, user)
            break

          case 'children':
            for(const child of roles[role].children)
              acl.addRoleChild(role, child)
            break

          case 'resources':
            for(const resource in roles[role].resources)
            {
              acl.addRoleResource(role, resource)

              const permissions = Array.isArray(roles[role].resources[resource])
              ?  roles[role].resources[resource]
              : [roles[role].resources[resource]]

              for(const permission of permissions)
                acl.addRoleResourcePermission(role, resource, permission)
            }
            break

          default:
            const error = new Error(`unknown key:"${key}"`)
            error.code = 'ERR_INVALID_ARG_KEY'
            throw error
        }

    return acl
  }

  hasRole(role)
  {
    return role in this.roles
  }

  addRole(role)
  {
    if(this.hasRole(role))
      return // preventing reinitializing an existing role

    this.roles[role] =
    {
      users     : [],
      children  : [],
      resources : {}
    }
  }

  removeRole(role)
  {
    delete this.roles[role]

    for(const role in this.roles)
      this.removeRoleChild(role, child)
  }

  hasRoleChild(role, child)
  {
    return this.hasRole(role)
        && this.roles[role].children.includes(child)
  }

  hasRoleChildRecursively(role, child)
  {
    if(this.hasRoleChild(role, child))
      return true

    if(this.hasRole(role))
      for(const roleChild of this.roles[role].children)
        if(this.hasRoleChildRecursively(roleChild, child))
          return true

    return false
  }

  addRoleChild(role, child)
  {
    this.addRole(child)
    this.addRole(role)

    if(this.hasRoleChildRecursively(child, role))
      return // preventing recursion

    this.roles[role].children.push(child)
  }

  removeRoleChild(role, child)
  {
    if(this.hasRole(role))
    {
      const i = this.roles[role].children.indexOf(child)
      ~i && this.roles[role].children.splice(i, 1)
    }
  }

  hasRoleUser(role, user)
  {
    return this.hasRole(role)
        && this.roles[role].users.includes(user)
  }

  addRoleUser(role, user)
  {
    this.addRole(role)

    if(this.hasRoleUser(role, user))
      return // preventing duplicate users definition

    this.roles[role].users.push(user)
  }

  removeRoleUser(role, user)
  {
    if(this.hasRole(role))
    {
      const i = this.roles[role].users.indexOf(user)
      ~i && this.roles[role].users.splice(i, 1)
    }
  }

  removeUser(user)
  {
    for(const role in this.roles)
      this.removeRoleUser(role, user)
  }

  hasRoleResource(role, resource)
  {
    return this.hasRole(role)
        && resource in this.roles[role].resources
  }

  addRoleResource(role, resource)
  {
    this.addRole(role)

    if(this.hasRoleResource(role, resource))
      return // preventing reinitializing an existing role resource

    this.roles[role].resources[resource] = []
  }

  removeRoleResource(role, resource)
  {
    if(this.hasRole(role))
      delete this.roles[role].resources[resource]
  }

  removeResource(resource)
  {
    for(const role in this.roles)
      this.removeRoleResource(role, resource)
  }

  hasRoleResourcePermission(role, resource, permission)
  {
    return this.hasRoleResource(role, resource)
        && this.roles[role].resources[resource].includes(permission)
  }

  addRoleResourcePermission(role, resource, permission)
  {
    this.addRoleResource(role, resource)

    if(this.hasRoleResourcePermission(role, resource, permission))
      return // preventing duplicate permissions

    permission && this.roles[role].resources[resource].push(permission)
  }

  removeRoleResourcePermission(role, resource, permission)
  {
    if(this.hasRoleResource(role, resource))
    {
      const i = this.roles[role].resources[resource].indexOf(permission)
      ~i && this.roles[role].resources[resource].splice(i, 1)
    }
  }

  removeResourcePermission(resource, permission)
  {
    for(const role in this.roles)
      this.removeRoleResourcePermission(role, resource, permission)
  }

  getUserRoles(user)
  {
    const roles = []

    for(const role in this.roles)
      if(this.hasRoleUser(role, user))
        roles.push(role)

    return roles
  }

  getUserRolesRecursively(user)
  {
    const
    roles = [],
    chain = (role) =>
    {
      for(const roleChild of this.roles[role].children)
        if(this.hasRole(roleChild) && !roles.includes(roleChild))
        {
          roles.push(roleChild)
          chain(roleChild)
        }
    }

    for(const role in this.roles)
      if(this.hasRoleUser(role, user))
      {
        roles.push(role)
        chain(role)
      }

    return roles
  }

  getRolesRecursively(role)
  {
    const
    roles = [],
    chain = (role) =>
    {
      for(const roleChild of this.roles[role].children)
        if(this.hasRole(roleChild) && !roles.includes(roleChild))
        {
          roles.push(roleChild)
          chain(roleChild)
        }
    }

    if(this.hasRole(role))
    {
      roles.push(role)
      chain(role)
    }

    return roles
  }

  isUserAuthorized(user, resource, permission)
  {
    const roles = this.getUserRoles(user)

    for(const role of roles)
      if(this.isRoleAuthorized(role, resource, permission))
        return true

    return false
  }

  isRoleAuthorized(role, resource, permission)
  {
    const roles = this.getRolesRecursively(role)

    if(permission)
    {
      for(const role of roles)
        if(this.hasRoleResourcePermission(role, resource, permission)
        || this.hasRoleResourcePermission(role, '*', permission)
        || this.hasRoleResourcePermission(role, resource, '*')
        || this.hasRoleResourcePermission(role, '*', '*'))
          return true
    }
    else
    {
      for(const role of roles)
        if(this.hasRoleResource(role, resource)
        || this.hasRoleResource(role, '*'))
          return true
    }

    return false
  }
}
