# Domain

A `domain` specifies a solution to a problem that has a boundary drawn around it. The domain is the core of a `bounded context`. A domain is a grouped functionality that has a contextual coherence. Grouping logic by functionality is often considered a good practice. Drawing boundaries around grouped functionality is beneficial to be able to abstract and decrease distracting lower level noise; which improves the ability to control communication patterns, navigation and maintenance work.

## Breaking down the monolith

A solution that has a poor dependency map can be related to as a monolith. A monolith is a solution that is big and hard to maintain. "Breaking down the monolith" refers to drawing boundaries in the code, slicing the monolith into pieces that are easier to maintain, extend and reuse.

In the DDD community - **D**omain **D**riven **D**esign, "breaking down the monolith" relates to breaking down the system into "bounded contexts". A `bounded context` is a subset of the system.

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

---

### A contextual resource

A contextual resource is a concept that refers to a specific perspective of a data model. In a business, a resource, such as an "order", is often modeled differently in different parts of a system. For example, to an ISP - **I**nternet **S**ervice **P**rovider, an "order" is expected to hold relevant data depending on the context of the `domain`.

- An "order" to the **technicians** is expected to hold relevant provisioning data
- An "order" to the **marketing** department is expected to hold relevant analytical data
- An "order" to the **finance** department is expected to hold relevant billing details data

The context of the order plays a role in the definition of what data or functionality an order is expected to have. An order does obviously share an abstract common definition across contexts, but each context does not need to know of operations present to another contextual scope.

---

## Microservice

// A single data source to each domain in correlation with a microservice architecture.

---

### Branch or leaf

> To be, or not to be - an aggregate or not - a binary decition
> ...
