# Chatty Frontend

### Current Deployment

insert deployed url here.

### About
Chatty is an end-to-end encryption messenger. Users use RSA-OAEP key pairs to asymmetrically encrypt
and decrypt messages.

Users are only able to DM one person at a time and can reject/accept invites, providing they know a users
unique ID.

The backend repo can be found at [chatty](https://github.com/adradan/chatty).

### File Structure

Big fan of how Angular projects are structured, so going to be using [this Medium article](https://medium.com/@motcowley/angular-folder-structure-d1809be95542) and [Bulletproof React](https://github.com/alan2207/bulletproof-react)
as inspirations.

```text
- src/
    - features/
        - feature-1/
            - components/
                - component-1.tsx
            - routes/
            - types/
    - routes/
    - lib/
    - types/
    - components/
        - component-group-1/
            - component-1/
                - component-1.tsx
                - component-1.css
```

_Subject to change_

### License

This project is licensed under GNU GPL v3.

Refer to COPYING for details.
