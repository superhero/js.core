# Domain


A domain is a grouped functionality



..... Breaking down the monolith

..... A bounded context.

Grouping logic by feature is considered a good practice. Drawing boundaries around grouped features is benifitual to the code to better be able to control communicaton patterns in the code, navigate the code and maintain the code. A `domain` specifies a solution to a problem that has a boundary drawn around it.

In the DDD community - **D**omain **D**riven **D**esign, it has been discussed how to best describe a domain. The conclusion has been layed out by Eric Evans, and many other, as a bubble of bubbles. The `domain` specifies the solution, which is broken down to subsetts of bubbles, called `bounded contexts`. A `bounded context` is an abstract defintion, where each subsett is eaither a `core domain` or a `sub domain`. A `sub domain` as an abstract defintion, where each subsets is eaither a `supporting sub domain` or a `generic sub domain`. By breaking down the domain into subsetts, the different solutions that are addressed by the domain is better defined. This approach to architecture is top-down, first define a problem, then break that problem down.

## Bounded context

A bounded context is a defined solution to a problem. Each solution requires some form of autonomy, where alteration within one `bounded context` do not effect another `bounded context`, apart from the obvoius effect that changes in a public interface will have to dependent components.

A `bounded context` is an abstract name that does not define what type of subsett the context represents. A `bounded context` can be implemented as a `core domain` or a `sub domain`, explained further below.

### Core domain

The core domain is the important part of the application....

### Sub domain

#### Generic sub domain



#### Supporting sub domain



how a contextual feature is best designed. In short, the defintion of a `domain` is a code structure composed by multiple contextual resources. Each `domain` is defined by an operational context. An operational context can best be described by **who** is operating in the context.

A contextual resource is an important part to understand about a domain.

In a business, a resource - such as an order, is often modelled differently in different parts of a system. For example, to an ISP - **I**nternet **S**ervice **P**rovider, an order contains different relevant data depending on the context of the `domain`.

- An order to the **technicians** has relevant information regarding provisioning
- An order to the **marketing** has relevant analytical data
- An order to the **finance** has relevant information regarding billing details

As seen above, the context of the order plays a role in the defintion of what defines an order. An order does however share an abstract defintion. It can be confusing when an order has so many shared attributes between the different domains, but this is simple polymorphism that every developer should be able to relate to.



You may notice that a resource has many different dependencies to other resources. You may notice that all these dependent resources to the root resource are not always relevent in the context of different operations.





You could model the logic by seperating each resource as an isolated component, but often you notice that a resource has a dependency to another resource. And in an even more complex system, you may notice that a resource has many different dependencies to other resources, and you may notice that all these dependent resources to the root resource are not always relevent in the context of different operations.

In the DDD community - **D**omain **D**riven **D**esign, it has been discussed and explained how a contextual feature is best designed. The defintion of a `domain` is a code structure, grouped by feature. Each `domain` is defined by an operational context. An operational context can best be described by who is operating on the resource.

In a business, a resource - such as an order, is often modelled differently in different parts of a system. For example, to an ISP - **I**nternet **S**ervice **P**rovider, an order contains different relevant data depending on the context of the `domain`.

- An order to the **technicians** has relevant information regarding provisioning
- An order to the **marketing** has relevant analytical data
- An order to the **finance** has relevant information regarding billing details

As seen above, the context of the order plays a role in the defintion of what defines an order. An order does however share an abstract defintion. It can be confusing when an order has so many shared attributes between the different domains, but this is simple polymorphism that every developer should be able to relate to.

---

## Microservice

A single data source to each domain in correlation with a microservice architecture.

---

## Core domain

---

## Sub domain

---

## Branch or leaf domain
