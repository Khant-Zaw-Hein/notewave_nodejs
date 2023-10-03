var express = require('express');
var router = express.Router();
var todoRepo = require('../Repository/TodoRepository');

router.route('').get((request, response) => {
    todoRepo.getAllTodoList().then(result => {
        response.json(result[0]);
    })
})
router.route('/user/:id').get((request, response) => {
    todoRepo.getAllTodoListByUserAccountId(request.params.id).then(result => {
        response.json(result[0]);
    })
})

router.route('/:id').get((request, response) => {
    todoRepo.getTodoById(request.params.id).then(result => {
        // console.log(result);
        response.json(result[0]);
    })
})

// router.route('/add/:id').post((request, response) => {
//     // console.log("'/add'", request);
//     let todoModel = {...request.body}

//     todoRepo.addTodo(todoModel).then(result => {
//         response.status(201).json(result);
//     })
// })
router.route('/add/:id').post((request, response) => {
    // console.log("'/add'", request);
    let todoModel = {...request.body}

    todoRepo.addTodo(request.params.id, request.body.Description).then(result => {
        response.status(201).json(result);
    })
})

router.route('/:id').put((request, response) => {
    console.log(request.query.description);
    todoRepo.editTodoById(request.params.id, request.query.description).then(result => {
        // console.log(result);
        response.json(result);
    })
})

router.route('/:id').patch((request, response) => {
    todoRepo.UpdateTodoCheckboxById(request.params.id, request.query.isChecked).then(result => {
        response.json("update complete");
    })    .catch(error => {
        console.log(error);
        response.status(500).json({ error: 'An error occurred.' });
      });
})

router.route('/delete/:id').delete((request, response) => {
    todoRepo.deleteTodoById(request.params.id).then(result => {
        // console.log(result);
        response.json(result);
    })    .catch(error => {
        console.log(error);
        response.status(500).json({ error: 'Internal Server Error' });
      });
});


module.exports = router;