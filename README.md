# desafio-todolist
<h1 align="center">
  To-Do List
</h1>

API para gerenciar tarefas (To-Do List). A aplicação permite ao usuário
criar uma nova tarefa, visualizar todas as tarefas e visualizar uma tarefa específica.

## Tecnologias
 
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Spring MVC](https://docs.spring.io/spring-framework/reference/web/webmvc.html)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [SpringDoc OpenAPI 3](https://springdoc.org/v2/#spring-webflux-support)
- [Mysql](https://dev.mysql.com/downloads/)
- [Docker](https://www.docker.com)

## Ferramentas

- [Intelli](https://www.jetbrains.com/pt-br/idea/)
- [Visual Studio Code](https://code.visualstudio.com)


## Práticas adotadas

- SOLID, DRY, YAGNI, KISS
- API REST
- Consultas com Spring Data JPA
- Injeção de Dependências

## Como Executar

- Clonar repositório git
- Construir o projeto:
```
$ ./mvnw clean package
```
- Executar o banco de dados:
```
$ docker run --name todo-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=boot  -e MYSQL_DATABASE=todolist -d mysql
```

A API poderá ser acessada em [localhost:8080](http://localhost:8080).
O Front-end poderá ser visualizado em [localhost:3000](http://localhost:3000)

## API Endpoints

Para fazer as requisições HTTP abaixo, foi utilizada a ferramenta [postman](https://www.postman.com):

- Criar Tarefa 
```

POST: $ http://localhost:8080/todos "titulo":"Ir no cinema" "descricao":"Assitir um filme " "data": "02/10/2024" "status": "Em andamento" "prioridade": 2

[
    {
        "id": 4,
        "titulo": "Ir no cinema",
        "descricao": "Assitir um filme ",
        "data": "02/10/2024",
        "status": "Em andamento",
        "prioridade": 2
    }
]
```

- Listar Tarefas
```
GET: $ http://localhost:8080/todos

[
    {
        "id": 4,
        "titulo": "Ir no cinema",
        "descricao": "Assitir um filme ",
        "data": "02/10/2024",
        "status": "Em andamento",
        "prioridade": 2
    }
]
```

- Atualizar Tarefa
```
PUT: $ http://localhost:8080/todos/4 "titulo":"Finalizar planos de férias" "descricao":"Reservar hotel e comprar as passagens" "data": "02/10/2024" "status": "Em andamento" "prioridade": 3

[
    {
        "id": 4,
        "titulo": "Finalizar planos de férias",
        "descricao": "Rervar hotel e comprar as passagens",
        "data": "02/10/2024",
        "status": "Em andamento",
        "prioridade": 3
    }
]
```
