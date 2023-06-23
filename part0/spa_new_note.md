<!-- markdownlint-disable-file -->

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser: Execute js code that rendering new note
    Note over browser: Execute js code that send new note to server

    browser->>server: POST /exampleapp/new_note_spa
    server-->>browser: Status code: 201

```