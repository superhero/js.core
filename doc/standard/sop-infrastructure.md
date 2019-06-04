Standard Operating Procedure
Infrastructure
sop-infrastructure-1.0.0

Author: Erik Landvall

![Infrastructure diagram](diagram/sop-infrastructure.svg)

This standard defines a folder structure for the infrastructure layer. The infrastructure layer is responsible for the logic that is related to external services, domains or bounded contexts. The folder structure defines a list of bundles, that semantically correlates with the external bounded context. Each `bundle` has 3 different sub layers:
- `gateway`    - list of drivers necessary to interface with the API of the contextual `bundle`
- `mapper`     - responsible for mapping data between the present context and the context defined by the `bundle`, the `bounded context mapper`
- `repository` - correlated with external resources, on witch optional crud operations can be defined.

Crud operations are expected to be categorized in accordance to a naming convention that correlates with the acronym. The segregation of the read, write, update and delete models, correlates with the responsibility each layer maintain. Operations are expected to honor the single responsibility principle. Operations can depend on other operations from the same contextual `bundle`.

The `config` file defines the collected configurations for all the infrastructure, external services, that the bounded context, that the infrastructure layer partly defines, depends on.
