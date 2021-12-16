# Lab - Context Todos API <!-- omit in toc -->
- [Starter code](#starter-code)
- [Requirements](#requirements)
  - [Solution](#solution)
  - [Bonus](#bonus)

# Starter code
- Clone Repo
- Create a new branch `[your-initials]-solution`
- Run `$ npm install`
- Run `$ npm run serve`

# Requirements
Create a todos website!

> NOTE - You will need to refer to https://github.com/dented-academy/api-todos for the API Doc

## Solution
You should have:
- `src/pages/todos/Show.jsx`
  - `New Button` - Opens a **Modal** that contains a **Form** => **successful** submit =>  redirect to `/todos/:id`
  - `Edit Button` - Opens a **Modal** that contains a **Form** (you might need to use `e.preventDefault()` in `onClick`) => **successful** submit => re-render
  - `Delete Button` - **Successful** delete => Redirect to `/todos`

## Bonus
> NOTE: You should continue using `src/contexts/Todos.jsx`

You should have:
- `src/pages/todos/Index.jsx`
  - Todo Context Related
    - `New Button` - Opens a **Modal** that contains a **Form** (only `title`) => **successful** submit =>  redirect to `/todos/:id`
- `src/pages/todos/Show.jsx`
  - Todo Context Related
    - `Edit Button` - Opens a **Modal** that contains a **Form** (only `title`) => **successful** submit => re-render
    - `Delete Button` - **Successful** delete => Redirect to `/todos`
  - TodoItem Context Related
    - `Add Item Button` - Opens a **Modal** that contains a **Form** (only `name` & `checked`) => **successful** submit => re-render
    - `Edit Button` - Opens a **Modal** that contains a **Form** (only `name` & `checked`) => **successful** submit => re-render
    - `Toggle Checked Button` - **Successful** toggle => re-render
    - `Delete Item Button` - **Successful** delete => re-render
