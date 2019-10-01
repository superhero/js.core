# Index

- Core components

- - Bootstrap
- - CLI - Command Line Interface
- - Configuration
- - Console
- - Deepclone
- - Deepfind
- - Deepfreeze
- - Deepmerge
- - Eventbus
- - Http
- - - Request
- - - Server
- - Locator
- - - When to use
- - - When not to use
- - Object
- - Path
- - Process
- - Schema
- - String

- Code structure

- - Domain
- - - Microservice
- - - Core domain
- - - Sub domains
- - - Branch or leaf domain

- - Layers
- - - Api
- - - - Endpoint
- - - - Observer
- - - Domain
- - - - Aggregate
- - - - Composite
- - - - Schema
- - - - - DTO
- - - - - - Command
- - - - - - Query
- - - - - - Event
- - - - - Entity
- - - - - Value object
- - - - - Collection
- - - Infrastructure
- - - - Gateway
- - - - Repository
- - - - Anti corruption layer
- - - View
- - - - Template
- - - - Helper

- - Networks (???) (Grouping the diferent features by networks)

- Code automisation - Helper
- - Generate project
- - Generate API classes and corresponding tests from configuration
- - Generate API documentation
- - Generate Domain classes from configuration

- Tutorial
... Todo application

- Appendix | Architecture

- - The importance of balance
... Describing the importance of balance, the importance of realization of none abolute implementation of every principle, guidline or recomendation (don't be a slave to another mans word - think for your self, you know your reality better then someone who never has experienced the enviremnt on which you apply the principles)

- - Communication - Integration pattern between microservices
- - - MVC like pattern
- - - - M = Model       = Backend microservices
- - - - V = View        = UI microservices
- - - - C = Controller  = API microservice
- - - - - Security
- - - - - Point of failure that will take it all down, replicated state to help solve the problem

- - Designing software
- - - Specifications to code
- - - - Understanding the stakeholders
- - - - DDD - Domain driven design
- - - - - A good technique for understanding and building applications
- - - - - Good defintions of domain and infrastructure components
- - - - - Eventstorming

- - Eventsource
- - - The importance of an event log
- - - Create a state from the event log and use it as your statefull db

- - Isolation
- - - Scopes
- - - Globals

- - Stateless development
... Conditionless
... don't return bool if possible, it will force conditions else where
... Pollymophism

- - Don't over enginer
... Over enginering, what is the concept of over enginering and how to improve productivity by not trying to solve everything / every edge-case
... balance coding by flexibility and constraintfull to achive an endresult that reflects simplicity
... KISS  - Keep It Simple Stupid
... YAGNI - You Aint Gonna Need It
... MVP   - Minimal valiable product
