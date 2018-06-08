describe('acl', () =>
{
  const
  expect  = require('chai').expect,
  context = require('mochawesome/addContext'),
  Acl     = require('.')

  describe('from(roles)', () =>
  {
    it('should be able to create an instance from a configured json', function()
    {
      const acl = new Acl
      acl.addRoleUser('foo', 'foobar')
      acl.addRoleUser('foo', 'bazqux')
      acl.addRoleUser('bar', 'foobaz')
      acl.addRoleChild('bar', 'foo')
      acl.addRoleChild('bar', 'baz')
      acl.addRoleResource('baz', 'res-0')
      acl.addRoleResourcePermission('foo', 'res-1', 'perm-1-1')
      acl.addRoleResourcePermission('foo', 'res-2', 'perm-2-1')
      acl.addRoleResourcePermission('foo', 'res-2', 'perm-2-2')
      acl.addRoleResourcePermission('baz', 'res-1', 'perm-1-1')
      acl.addRoleResourcePermission('baz', 'res-1', 'perm-1-2')
      acl.addRoleResourcePermission('baz', 'res-1', 'perm-1-3')
      context(this, { title:'acl.roles', value:acl.roles })
      expect(Acl.from(acl.roles).roles).to.deep.equal(acl.roles)
    })

    it('should throw an error if there is an invalid key in the arg',
    () => expect(Acl.from.bind(null, { foo:{ bar:'baz' } })).to.throw(Error))
  })

  describe('hasRole(role)', () =>
  {
    it('should not find a role not previously added', () =>
    {
      const
      acl   = new Acl,
      role  = 'role'
      expect(acl.hasRole(role)).to.be.equal(false)
    })

    it('should be able to find an existing role', () =>
    {
      const
      acl   = new Acl,
      role  = 'role'
      expect(acl.hasRole(role)).to.be.equal(false)
      acl.addRole(role)
      expect(acl.hasRole(role)).to.be.equal(true)
    })
  })

  describe('addRole(role)', () =>
  {
    it('should be able to add a role', () =>
    {
      const
      acl   = new Acl,
      role  = 'role'
      expect(acl.hasRole(role)).to.be.equal(false)
      acl.addRole(role)
      expect(acl.hasRole(role)).to.be.equal(true)
    })

    it('adding the same role multiple times wont reset it', () =>
    {
      const
      acl   = new Acl,
      role  = 'foo',
      user  = 'bar'
      acl.addRole(role)
      acl.addRoleUser(role, user)
      acl.addRole(role)
      expect(acl.hasRoleUser(role, user)).to.be.equal(true)
    })
  })

  describe('removeRole(role)', () =>
  {
    it('removing a non existing role wont throw', () =>
    {
      const
      acl   = new Acl,
      role  = 'foo'
      expect(acl.removeRole.bind(acl, role)).to.not.throw()
    })

    it('removing an existing role to be removed', () =>
    {
      const
      acl   = new Acl,
      role  = 'foo'
      acl.addRole(role)
      expect(acl.hasRole(role)).to.be.equal(true)
      acl.removeRole(role)
      expect(acl.hasRole(role)).to.be.equal(false)
    })
  })

  describe('hasRoleChild(role, child)', () =>
  {
    it('should return false if child is not child of role', () =>
    {
      const
      acl   = new Acl,
      role  = 'foo',
      child = 'bar'
      expect(acl.hasRoleChild(role, child)).to.be.equal(false)
      acl.addRole(role)
      expect(acl.hasRoleChild(role, child)).to.be.equal(false)
      acl.addRole(child)
      expect(acl.hasRoleChild(role, child)).to.be.equal(false)
    })

    it('should be able to find a child of a role', () =>
    {
      const
      acl   = new Acl,
      role  = 'foo',
      child = 'bar'
      acl.addRoleChild(role, child)
      expect(acl.hasRoleChild(role, child)).to.be.equal(true)
    })
  })

  describe('hasRoleChildRecursively(role, child)', () =>
  {
    it('should return false if child does not derive from role', () =>
    {
      const
      acl           = new Acl,
      role          = 'foo',
      child         = 'bar',
      childOfChild  = 'baz'
      expect(acl.hasRoleChildRecursively(role, childOfChild)).to.be.equal(false)
      acl.addRole(role)
      expect(acl.hasRoleChildRecursively(role, childOfChild)).to.be.equal(false)
      acl.addRole(child)
      expect(acl.hasRoleChildRecursively(role, childOfChild)).to.be.equal(false)
      acl.addRole(childOfChild)
      expect(acl.hasRoleChildRecursively(role, childOfChild)).to.be.equal(false)
      acl.addRoleChild(role, child)
      expect(acl.hasRoleChildRecursively(role, childOfChild)).to.be.equal(false)
    })

    it('should return true if child derives from role', () =>
    {
      const
      acl           = new Acl,
      role          = 'foo',
      child         = 'bar',
      childOfChild  = 'baz'
      acl.addRoleChild(role, child)
      acl.addRoleChild(child, childOfChild)
      expect(acl.hasRoleChildRecursively(role, childOfChild)).to.be.equal(true)
    })
  })

  describe('addRoleChild(role, child)', () =>
  {
    it('should be able to add a child to a role', () =>
    {
      const
      acl   = new Acl,
      role  = 'foo',
      child = 'bar'
      acl.addRoleChild(role, child)
      expect(acl.hasRole(role)).to.be.equal(true)
      expect(acl.hasRole(child)).to.be.equal(true)
      expect(acl.hasRoleChild(role, child)).to.be.equal(true)
    })
  })

  describe('removeRoleChild(role, child)', () =>
  {
    it('should be able to remove a child from a role', () =>
    {
      const
      acl   = new Acl,
      role  = 'foo',
      child = 'bar'
      acl.addRoleChild(role, child)
      expect(acl.hasRoleChild(role, child)).to.be.equal(true)
      acl.removeRoleChild(role, child)
      expect(acl.hasRoleChild(role, child)).to.be.equal(false)
    })
  })

  describe('hasRoleUser(role, user)', () =>
  {
    it('should return true only if role has user', () =>
    {
      const
      acl  = new Acl,
      role = 'foo',
      user = 'bar'
      expect(acl.hasRoleUser(role, user)).to.be.equal(false)
      acl.addRole(role)
      expect(acl.hasRoleUser(role, user)).to.be.equal(false)
      acl.addRoleUser(role, user)
      expect(acl.hasRoleUser(role, user)).to.be.equal(true)
    })
  })

  describe('addRoleUser(role user)', () =>
  {
    it('adding a user to a role also creates the role', () =>
    {
      const
      acl  = new Acl,
      role = 'foo',
      user = 'bar'
      expect(acl.hasRole(role)).to.be.equal(false)
      acl.addRoleUser(role, user)
      expect(acl.hasRole(role)).to.be.equal(true)
    })

    it('should be able to add a user to a role', () =>
    {
      const
      acl  = new Acl,
      role = 'foo',
      user = 'bar'
      expect(acl.hasRoleUser(role, user)).to.be.equal(false)
      acl.addRoleUser(role, user)
      expect(acl.hasRoleUser(role, user)).to.be.equal(true)
    })
  })

  describe('removeRoleUser(role, user)', () =>
  {
    it('should be able to remove a user from a role', () =>
    {
      const
      acl  = new Acl,
      role = 'foo',
      user = 'bar'
      expect(acl.hasRoleUser(role, user)).to.be.equal(false)
      acl.addRoleUser(role, user)
      expect(acl.hasRoleUser(role, user)).to.be.equal(true)
      acl.removeRoleUser(role, user)
      expect(acl.hasRoleUser(role, user)).to.be.equal(false)
    })
  })

  describe('removeUser(user)', () =>
  {
    it('should be able to remove a user from all roles', () =>
    {
      const
      acl   = new Acl,
      role1 = 'foo',
      role2 = 'bar',
      role3 = 'baz',
      user  = 'qux'
      acl.addRoleUser(role1, user)
      acl.addRoleUser(role2, user)
      expect(acl.hasRoleUser(role1, user)).to.be.equal(true)
      expect(acl.hasRoleUser(role2, user)).to.be.equal(true)
      expect(acl.hasRoleUser(role3, user)).to.be.equal(false)
      acl.removeUser(user)
      expect(acl.hasRoleUser(role1, user)).to.be.equal(false)
      expect(acl.hasRoleUser(role2, user)).to.be.equal(false)
      expect(acl.hasRoleUser(role3, user)).to.be.equal(false)
    })
  })

  describe('hasRoleResource(role, resource)', () =>
  {
    it('should return true only if the role has the resource', () =>
    {
      const
      acl       = new Acl,
      role      = 'foo',
      resource  = 'bar'
      expect(acl.hasRoleResource(role, resource)).to.be.equal(false)
      acl.addRole(role)
      expect(acl.hasRoleResource(role, resource)).to.be.equal(false)
      acl.addRoleResource(role, resource)
      expect(acl.hasRoleResource(role, resource)).to.be.equal(true)
    })
  })

  describe('addRoleResource(role, resource)', () =>
  {
    it('should be able to add a resource to a role', () =>
    {
      const
      acl       = new Acl,
      role      = 'foo',
      resource  = 'bar'
      expect(acl.hasRoleResource(role, resource)).to.be.equal(false)
      acl.addRoleResource(role, resource)
      expect(acl.hasRoleResource(role, resource)).to.be.equal(true)
    })
  })

  describe('removeRoleResource(role, resource)', () =>
  {
    it('should be able to remove a resource from a role', () =>
    {
      const
      acl       = new Acl,
      role      = 'foo',
      resource  = 'bar'
      expect(acl.hasRoleResource(role, resource)).to.be.equal(false)
      acl.addRoleResource(role, resource)
      expect(acl.hasRoleResource(role, resource)).to.be.equal(true)
      acl.removeRoleResource(role, resource)
      expect(acl.hasRoleResource(role, resource)).to.be.equal(false)
    })

    it('removing a resource from a role should not remove the role', () =>
    {
      const
      acl       = new Acl,
      role      = 'foo',
      resource  = 'bar'
      acl.addRoleResource(role, resource)
      acl.removeRoleResource(role, resource)
      expect(acl.hasRole(role)).to.be.equal(true)
    })
  })

  describe('removeResource(resource)', () =>
  {
    it('should be able to remove a resource from all roles', () =>
    {
      const
      acl       = new Acl,
      role1     = 'foo',
      role2     = 'bar',
      role3     = 'baz',
      resource  = 'qux'
      acl.addRole(role1)
      acl.addRoleResource(role2, resource)
      acl.addRoleResource(role3, resource)
      expect(acl.hasRoleResource(role1, resource)).to.be.equal(false)
      expect(acl.hasRoleResource(role2, resource)).to.be.equal(true)
      expect(acl.hasRoleResource(role3, resource)).to.be.equal(true)
      acl.removeResource(resource)
      expect(acl.hasRoleResource(role1, resource)).to.be.equal(false)
      expect(acl.hasRoleResource(role2, resource)).to.be.equal(false)
      expect(acl.hasRoleResource(role3, resource)).to.be.equal(false)
    })
  })

  describe('hasRoleResourcePermission(role, resource, permission)', () =>
  {
    it('should return true only if the role has the permission', () =>
    {
      const
      acl   = new Acl,
      role  = 'foo',
      res   = 'bar',
      per   = 'baz'
      expect(acl.hasRoleResourcePermission(role, res, per)).to.be.equal(false)
      acl.addRole(role)
      expect(acl.hasRoleResourcePermission(role, res, per)).to.be.equal(false)
      acl.addRoleResource(role, res)
      expect(acl.hasRoleResourcePermission(role, res, per)).to.be.equal(false)
      acl.addRoleResourcePermission(role, res, per)
      expect(acl.hasRoleResourcePermission(role, res, per)).to.be.equal(true)
    })
  })

  describe('addRoleResourcePermission(role, resource, permission)', () =>
  {
    it('should be able to add a permission to a role', () =>
    {
      const
      acl   = new Acl,
      role  = 'foo',
      res   = 'bar',
      per   = 'baz'
      expect(acl.hasRoleResourcePermission(role, res, per)).to.be.equal(false)
      acl.addRoleResourcePermission(role, res, per)
      expect(acl.hasRoleResourcePermission(role, res, per)).to.be.equal(true)
    })

    it('should add a resource to the role', () =>
    {
      const
      acl   = new Acl,
      role  = 'foo',
      res   = 'bar',
      per   = 'baz'
      expect(acl.hasRoleResource(role, res)).to.be.equal(false)
      acl.addRoleResourcePermission(role, res, per)
      expect(acl.hasRoleResource(role, res)).to.be.equal(true)
    })

    it('should add a role', () =>
    {
      const
      acl   = new Acl,
      role  = 'foo',
      res   = 'bar',
      per   = 'baz'
      expect(acl.hasRole(role)).to.be.equal(false)
      acl.addRoleResourcePermission(role, res, per)
      expect(acl.hasRole(role)).to.be.equal(true)
    })
  })

  describe('removeRoleResourcePermission(role, resource, permission)', () =>
  {
    it('should remove a permission from a role resource', () =>
    {
      const
      acl   = new Acl,
      role  = 'foo',
      res   = 'bar',
      per   = 'baz'
      acl.addRoleResourcePermission(role, res, per)
      expect(acl.hasRoleResourcePermission(role, res, per)).to.be.equal(true)
      acl.removeRoleResourcePermission(role, res, per)
      expect(acl.hasRoleResourcePermission(role, res, per)).to.be.equal(false)
    })
  })

  describe('removeResourcePermission(resource, permission)', () =>
  {
    it('should remove a permission from a resource on all roles', () =>
    {
      const
      acl   = new Acl,
      role1 = 'foo1',
      role2 = 'foo2',
      role3 = 'foo3',
      res   = 'bar',
      per   = 'baz'
      acl.addRoleResource(role1, res)
      acl.addRoleResourcePermission(role2, res, per)
      acl.addRoleResourcePermission(role3, res, per)
      expect(acl.hasRoleResourcePermission(role1, res, per)).to.be.equal(false)
      expect(acl.hasRoleResourcePermission(role2, res, per)).to.be.equal(true)
      expect(acl.hasRoleResourcePermission(role3, res, per)).to.be.equal(true)
      acl.removeResourcePermission(res, per)
      expect(acl.hasRoleResourcePermission(role1, res, per)).to.be.equal(false)
      expect(acl.hasRoleResourcePermission(role2, res, per)).to.be.equal(false)
      expect(acl.hasRoleResourcePermission(role3, res, per)).to.be.equal(false)
    })

    it('should not remove the role and resouce', () =>
    {
      const
      acl   = new Acl,
      role1 = 'foo1',
      role2 = 'foo2',
      role3 = 'foo3',
      res   = 'bar',
      per   = 'baz'
      acl.addRoleResource(role1, res)
      acl.addRoleResourcePermission(role2, res, per)
      acl.addRoleResourcePermission(role3, res, per)
      acl.removeResourcePermission(res, per)
      expect(acl.hasRoleResource(role1, res, per)).to.be.equal(true)
      expect(acl.hasRoleResource(role2, res, per)).to.be.equal(true)
      expect(acl.hasRoleResource(role3, res, per)).to.be.equal(true)
    })
  })

  describe('getUserRoles(user)', () =>
  {
    it('should return a list of all the roles a user have', () =>
    {
      const
      acl   = new Acl,
      user  = 'foobar',
      role1 = 'foo',
      role2 = 'bar',
      role3 = 'baz',
      role4 = 'qux'
      acl.addRoleUser(role1, user)
      acl.addRoleUser(role2, user)
      acl.addRoleChild(role1, role3)
      acl.addRoleChild(role2, role4)
      expect(acl.getUserRoles(user)).to.have.members([role1, role2])
    })
  })

  describe('getUserRolesRecursive(user)', () =>
  {
    it('should return a list of roles and the derieved roles a user have', () =>
    {
      const
      acl       = new Acl,
      user1     = 'foobar1',
      user2     = 'foobar2',
      role1     = 'foo',
      role2     = 'bar',
      role3     = 'baz',
      role4     = 'qux',
      expected  = [role1, role2, role3]
      acl.addRoleUser(role1, user1)
      acl.addRoleUser(role2, user1)
      acl.addRoleChild(role1, role3)
      acl.addRole(role4)
      expect(acl.getUserRolesRecursively(user1)).to.have.members(expected)
      acl.addRoleUser(role4, user2)
      expect(acl.getUserRolesRecursively(user1)).to.have.members(expected)
    })
  })

  describe('getRolesRecursively(role)', () =>
  {
    it('should return a list of roles derieved of the root role', () =>
    {
      const
      acl       = new Acl,
      role1     = 'foo',
      role2     = 'bar',
      role3     = 'baz',
      role4     = 'qux',
      expected  = [role1, role3]
      acl.addRole(role1)
      acl.addRole(role2)
      acl.addRoleChild(role1, role3)
      expect(acl.getRolesRecursively(role1)).to.have.members(expected)
      acl.addRole(role4)
      expect(acl.getRolesRecursively(role1)).to.have.members(expected)
    })
  })

  describe('isUserAuthorized(user, resource, permission)', () =>
  {
    it('should only allow a valid permission', () =>
    {
      const
      acl         = new Acl,
      user        = 'foo',
      role        = 'bar',
      resource    = 'baz',
      permission  = 'qux'

      acl.addRoleUser(role, user)
      acl.addRoleResourcePermission(role, resource, permission)
      const result = acl.isUserAuthorized(user, resource, permission)
      expect(result).to.be.equal(true)
    })

    it('should allow a valid permission through a role hierarchy', () =>
    {
      const
      acl         = new Acl,
      user1       = 'foo1',
      user2       = 'foo2',
      role1       = 'bar1',
      role2       = 'bar2',
      resource1   = 'baz1',
      resource2   = 'baz2',
      permission  = 'qux'

      acl.addRoleUser(role1, user1)
      acl.addRoleUser(role2, user2)
      acl.addRoleResourcePermission(role1, resource1, permission)
      acl.addRoleResourcePermission(role2, resource2, permission)
      const result1 = acl.isUserAuthorized(user1, resource2, permission)
      expect(result1).to.be.equal(false)
      acl.addRoleChild(role1, role2)
      const result2 = acl.isUserAuthorized(user1, resource2, permission)
      expect(result2).to.be.equal(true)
    })

    it('should not allow an invalid permission', () =>
    {
      const
      acl         = new Acl,
      user1       = 'foo1',
      user2       = 'foo2',
      role1       = 'bar1',
      role2       = 'bar2',
      resource1   = 'baz1',
      resource2   = 'baz2',
      permission  = 'qux'

      acl.addRoleUser(role1, user1)
      acl.addRoleUser(role2, user2)
      acl.addRoleResourcePermission(role1, resource1, permission)
      acl.addRoleResourcePermission(role2, resource2, permission)
      const result1 = acl.isUserAuthorized(user1, resource1, permission)
      expect(result1).to.be.equal(true)
      const result2 = acl.isUserAuthorized(user1, resource2, permission)
      expect(result2).to.be.equal(false)
    })
  })

  describe('isRoleAuthorized(role, resource, permission)', () =>
  {
    it('should only allow a valid permission', () =>
    {
      const
      acl         = new Acl,
      role        = 'bar',
      resource    = 'baz',
      permission  = 'qux'

      acl.addRole(role)
      acl.addRoleResourcePermission(role, resource, permission)
      const result = acl.isRoleAuthorized(role, resource, permission)
      expect(result).to.be.equal(true)
    })

    it('should allow a valid permission through a role hierarchy', () =>
    {
      const
      acl         = new Acl,
      role1       = 'bar1',
      role2       = 'bar2',
      resource1   = 'baz1',
      resource2   = 'baz2',
      permission  = 'qux'

      acl.addRole(role1)
      acl.addRole(role2)
      acl.addRoleResourcePermission(role1, resource1, permission)
      acl.addRoleResourcePermission(role2, resource2, permission)
      const result1 = acl.isRoleAuthorized(role1, resource2, permission)
      expect(result1).to.be.equal(false)
      acl.addRoleChild(role1, role2)
      const result2 = acl.isRoleAuthorized(role1, resource2, permission)
      expect(result2).to.be.equal(true)
    })

    it('should not allow an invalid permission', () =>
    {
      const
      acl         = new Acl,
      role1       = 'bar1',
      role2       = 'bar2',
      resource1   = 'baz1',
      resource2   = 'baz2',
      permission  = 'qux'

      acl.addRole(role1)
      acl.addRole(role2)
      acl.addRoleResourcePermission(role1, resource1, permission)
      acl.addRoleResourcePermission(role2, resource2, permission)
      const result1 = acl.isRoleAuthorized(role1, resource1, permission)
      expect(result1).to.be.equal(true)
      const result2 = acl.isRoleAuthorized(role1, resource2, permission)
      expect(result2).to.be.equal(false)
    })

    it('* for resouce should allow access to all resources', () =>
    {
      const
      acl         = new Acl,
      role1       = 'bar1',
      resource1   = 'baz1',
      resource2   = 'baz2',
      permission  = 'qux'

      acl.addRole(role1)
      acl.addRoleResourcePermission(role1, '*', permission)
      const result1 = acl.isRoleAuthorized(role1, resource1, permission)
      expect(result1).to.be.equal(true)
      const result2 = acl.isRoleAuthorized(role1, resource2, permission)
      expect(result2).to.be.equal(true)
    })

    it('* for permission should allow access to all permissions', () =>
    {
      const
      acl         = new Acl,
      role1       = 'bar1',
      resource1   = 'baz1',
      permission1 = 'qux1',
      permission2 = 'qux2'

      acl.addRole(role1)
      acl.addRoleResourcePermission(role1, resource1, '*')
      const result1 = acl.isRoleAuthorized(role1, resource1, permission1)
      expect(result1).to.be.equal(true)
      const result2 = acl.isRoleAuthorized(role1, resource1, permission2)
      expect(result2).to.be.equal(true)
    })

    it('* for permission and resource should allow access to everything', () =>
    {
      const
      acl         = new Acl,
      role1       = 'bar1',
      resource1   = 'baz1',
      resource2   = 'baz2',
      permission1 = 'qux1',
      permission2 = 'qux2'

      acl.addRole(role1)
      acl.addRoleResourcePermission(role1, '*', '*')
      const result1 = acl.isRoleAuthorized(role1, resource1, permission1)
      expect(result1).to.be.equal(true)
      const result2 = acl.isRoleAuthorized(role1, resource2, permission2)
      expect(result2).to.be.equal(true)
    })

    it('undefined permission should allow access on a resource level', () =>
    {
      const
      acl         = new Acl,
      role1       = 'bar1',
      role2       = 'bar2',
      resource1   = 'baz1',
      resource2   = 'baz2',
      permission1 = 'qux1',
      permission2 = 'qux2'

      acl.addRole(role1)
      acl.addRole(role2)
      acl.addRoleResourcePermission(role1, resource1, permission1)
      acl.addRoleResourcePermission(role2, resource2, permission2)
      const result1 = acl.isRoleAuthorized(role1, resource1)
      expect(result1).to.be.equal(true)
      const result2 = acl.isRoleAuthorized(role1, resource2)
      expect(result2).to.be.equal(false)
    })
  })
})
