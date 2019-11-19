# Code structure

Code structure can be modeled in many different ways. Advocated advice expressed in this documentation are guidelines, not enforced or strict rules a developer must submit to. There are many possible models to a problem. The suggested guidelines in this documentation is aimed to improve your ability to structure code in a coherent manner.

---

## Coherent design

When designing a system of any form, it is of great importance to follow a coherent pattern that is repeated through different resolutions of the system; *much like a mathematical fractal. Just as a fractal, the sequence changes in relation to the surrounding, but a pattern persists. The coherent pattern in different resolutions can be different, though never chaotic.*

In relation to coherence, chaos is the definition of incoherent. An incoherent system design is hard to understand and navigate through. In mathematics - chaos theory; chaos is defined as an initial small conditional change that has a staggering systematic effect and is hard to predict. When a model of a problem is incoherent, not aligned with pre-defined principles, then it is harder to evaluate what effect a modification to the system has.

### **Stable design**

Robert C. Martin pointed out that stability in system architecture is correlated with code that is closed to modification. In one of Roberts great books; *"Clean Architecture: A Craftsman's Guide to Software Structure and Design"*, Robert talks about the "Open / Close" principle - conceived by Bertrand Meyer. The principle expresses that a stable component should be open for extension, and closed to modification. As the principles reflects, extended functionality over modified functionality must be prioritized when possible.

### **Why a coherent design is important**

A coherent design eases the ability for developers in the system to navigate the logic. It is important to ease the developers navigational abilities to increase developers ability to maintain the system, to find problems in the system and solve these problems - resulting in a more stable system.

A coherent design is closely related to simplicity. A developer that is developing an operation in one part of the system will in the future need to integrate with, and work in, other parts of the system. When a developer work within different segments of the system, then a developers familiarity in each segment will reflect on the developers agile ability, the possibility to move between projects.

A coherent design eases the ability to understand the system at scale. Successful systems grows beyond intention, an indisputable fact. The result is an increasing complexity, no matter how well designed the system is. An increased complexity generates unexpected behaviors that must be analyses to solve, resulting in greater costs. A greater understanding of the system will result in less costs for analytic needed to solve problems as they occur.

---

## Boundaries

*"Software architecture is the art of drawing lines"* - Robert C. Martin

A boundary is an encapsulation of components that are tighter coupled then components across boundaries. Interaction across boundaries are allowed, though they should be limited. Each drawn boundary should define a public interface to be able to interact with the context. When documenting code, priority should be on documenting these interfaces. As there are different levels of implementations, the priority of documentation is on the higher leveled implementation.

It is common to draw boundaries on different levels. What a higher level refers to is when a set of boundaries are aggregated as a context. A lower level is closer to the code implementation.

Eric Evans wrote a great book called *"Domain-Driven Design: Tackling Complexity in the Heart of Software"*. In the book, Evans describes the concept of a bounded context. A bounded context is a good example of an encapsulation of components that separates different domains by explicit boundaries.

Boundaries within a system is defined to break down a monolithic code base. Boundaries aggregates utility and defines a less noisy dependency map that is easier to navigate.

### **Dependency direction**

Each boundary has a dependency direction that determines how the system interacts with other components of the system. The dependency direction should relate to the implementation level, where a lower level is closer to code implementation, and where a lower level of code implementation is closer to IO operations. Components dependency direction should be from higher to lower level. A stronger architecture focuses on stability in the lower level components, where stability is defined by independent components that are closed for modification.

---

## Naming convention

The naming convention advocated by this documentation should reflect both a domain specific language, as well as a logical specification associated with the named component.

For example, a class that is part of the `Infrastructure` layer, specifying a `Repository` to the service `Foo` for the resource `Bar`, should be named accordingly; `Infrastructure.FooReposityBar`, where `Infrastructure` is a namespace, and where the class name `FooReposityBar` reflects the directory structure.

In the named repository, the methods of the class are named after what they do. A method that fetches a resource by id should be named `fetchById`.

Alternatively, if the repository is global to the service, the naming convention could also look something like; `Infrastructure.FooReposity#fetchFooById`.

Be explicit in your naming. For example, if you name a query, instead of calling the query `fetch-a-resource`; a more explicit name is `fetch-a-single-resource-by-id`.

---

## Semantics

Semantic code is self documented and self explainable. Code that explains it self must cover **what** the code does, **how** the code does what it does and **when** the code does what it does. Using a domain language for semantic definition is an approach that offers a meaning from domain experts perspective. In a higher resolution, at a lower level, technical details are of greater value. From the perspective of an implementer, the domain language has value, but so does a logical definition of **how** the problem has been solved. The semantic model should therefor reflect a domain specific language as well as being defined by logical concepts.

Eric Evans express the importance of defining an ubiquitous language - a domain specific language that is recognizable by the stakeholders. Such an approach has great value to the modeled solution from many perspectives. Evans also defined many logical concepts that is useful in the same model, but of grater importance in a higher resolution, where the maintenance workers operate.

### **Perspective**

Code structure will be viewed from different perspectives, where different level of implementation has value.

To grasp an overview of what the implementation does, it is helpful with an aggregated definition that can be unfold and describe a deeper meaning by diving deeper into the resolution. **A top-down perspective.**

From a maintainers perspective, the implementation details of a solution has value, as well as the effect modification could have upstream to dependent components. **A bottom-up perspective.**

This documentation advocates that both a **top-down** and **bottom-up** perspectives is reflected in the code structure of your solution for semantic reasoning. Semantic is...
