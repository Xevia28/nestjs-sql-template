# Hygen Code Generation Support

## Installation

First, install Hygen globally:

```bash
npm install -g hygen
# or
yarn global add hygen

## Command to generator module 
hygen generator new module


# Example output
src/modules/user/
├── user.controller.ts
├── user.service.ts
├── user.module.ts
├── user.entity.ts
└── dtos/
    ├── create-user.dto.ts
    └── update-user.dto.ts
|__commands/
    |__create-user-command.dto.ts
|__exceptions/
    |_not-found-exception.ts
