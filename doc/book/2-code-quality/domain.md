# Domain

A `domain` specifies a solution to a problem that has a boundary drawn around it. The domain is the core of a `bounded context`. A domain is a grouped functionality that has a contextual coherence. Grouping logic by functionality is often considered a good practice. Drawing boundaries around grouped functionality is beneficial to be able to abstract and decrease distracting lower level noise; which improves the ability to control communication patterns, navigation and maintenance work.

## Breaking down the monolith

A solution that has a poor dependency map can be related to as a monolith. A monolith is a solution that is big and hard to maintain. "Breaking down the monolith" refers to drawing boundaries in the code, slicing the monolith into pieces that are easier to maintain, extend and reuse.

In the **DDD** community - **D**omain **D**riven **D**esign, "breaking down the monolith" relates in parts to breaking down the system into "bounded contexts". A `bounded context` is a subset of the system.

A system is a solution to a problem. When ever a problem needs to be solved, it is beneficial to break the problem down into contextual subsets. By breaking down a problem it is easier to focus on each contextual subset and optimize the solution.

A broken down monolith is a system that is composed by multiple units that all addresses specific problems in the final solution. *This approach to architecture is a top-down approach; first define a problem, then break that problem down.*

### Bounded context

A `bounded context` is autonomous, where alteration within one `bounded context` do not effect another, apart from the obvious effect that changes in a public interface has to dependent components.

A `bounded context` is an abstract definition, where each implementation is a `core domain` or a `sub domain`. A `sub domain` is also an abstract definition, where each implementation is either a `supporting sub domain` or a `generic sub domain`.

A `bounded context` is arguable best defined by an operational context. An operational context can best be described by **who** is operating in the context.

#### `core domain`

> ...

#### `supporting sub domain`

> ...

#### `generic sub domain`

> ...

### A contextual resource

A contextual resource is a concept that refers to a specific perspective of a data model. In a business, a resource, such as an "order", is often modeled differently in different parts of a system. For example, to an ISP - **I**nternet **S**ervice **P**rovider, an "order" is expected to hold relevant data depending on the context of the `domain`.

- An "order" to the **technicians** is expected to hold relevant provisioning data
- An "order" to the **marketing** department is expected to hold relevant analytical data
- An "order" to the **finance** department is expected to hold relevant billing details data

The context of the order plays a role in the definition of what data or functionality an order is expected to have. An order does obviously share an abstract common definition across contexts, but each context does not need to know of operations present to another contextual scope.

## DDD and Microservices

Microservice architecture addresses the problem of "breaking down the monolith" by  decomposing a system to separate smaller and isolated services, modulating each solution to more reusable, easier to test and more stable components.

The same reasoning used to advocate a "microservice" architecture is used by the DDD community. A symbiotic branch between microservices and DDD has taken form, where a microservice is declared as a `bounded context`. The approach to define a microservice as a `bounded context` implies a larger microservice then what is commonly argued in favor of in a microservice architecture.

The benefit of applying both a DDD and microservice architecture in the same stack relates to the inherited value of both approaches, solving the problems appearing in the other methodology.

### A DDD architecture benefits from a microservice approach

In a DDD architecture it can be hard to isolate the different contexts, with a clear interface and a proper anti-corruption layer between the domains.

When relying on support from a microservice architecture with DDD, the distinguished segregation between domains is explicit. The symbolism in packed and separately deployed services as a distinct process, conceptualizes the important notation of isolated domains.

### A microservice architecture benefits from DDD

In a microservice architecture, it is often a relate-able problem that components grow tighter coupled into a monolithic network of services.

By representing a service as a `bounded context`, a boundary is drawn around contexts, resulting in an additional level of resolution to the architecture, clearing out noise in the communication patterns.

### Branch or leaf

A leaf service is responsible for a single source of data.

A branch operates as an aggregated service, responsible for domain logic that is aggregating one or many infrastructures.

It is considered an anti-pattern, by this documentation, if the responsibility of a leaf and branch service is designed to operate in the same process. *To be, or not to be - an aggregate or not - a binary decision.*

## Anti corruption layer

Between different domains, in the infrastructure layer, it is suitable to translate messages from external contexts to the domain language of the operating context.

An example is when retrieving a DTO, **D**ata **T**ransfer **O**bject, from an external resource. The fetched DTO should be **mapped** to a recognizable data structure to the contextual domain. A recognizable data structure could be an event, entity or a simple value-object.

Where the mapping from an abstract DTO to a concrete representation happens, is referred to as an anti-corruption layer. In DDD, the anti-corruption layer is represented by a component called "Context-Mapper".

The responsibility of an anti-corruption layer is to validate, translate, filter and map communication between domains. The segregation of this specific logic has great  
