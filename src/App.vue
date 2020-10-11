<template>
  <h3 class="text-center my-3">Vue 3 ToDo App</h3>
  <div class="row justify-content-center mt-4">
    <div class="col-md-6">
      <form action="" @submit.prevent="addNewToDo">
        <label for="newToDo">New To Do</label>
        <input id="newToDo" v-model="newToDo" class="form-control" name="newTodo"/>
        <button class="btn btn-primary mt-3">Add New To Do</button>
      </form>
      <button @click="markAllDone" class="btn btn-success my-3">Mark All Done</button>
      <button @click="removeDoneTask" class="btn btn-danger my-3 ml-3">Remove Done Task</button>
      <button @click="removeAll" class="btn btn-danger my-3 ml-3">Remove All Task</button>
      <ul class="pl-3">
        <li v-for="(todo,index) in todos" :key="index" class="my-3 todo">
          <h4 class="d-inline" :class="{'text-checked':todo.done}" @click="toggleDone(todo)">{{ todo.task }}</h4>
          <button @click="removeTodo(todo.id)" class="btn btn-danger btn-sm float-right">Delete</button>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>


import {ref, onMounted} from "vue";
import firebase from "./firebaseConfig";

const db = firebase.firestore();

export default {
  name: 'App',
  components: {},
  setup() {
    const newToDo = ref('');
    const todos = ref([]);

    function addNewToDo() {
      if (newToDo.value !== "") {
        db.collection("todos")
            .add({task: newToDo.value, done: false})
            .then(() => {
              console.log("New Task is added successfully!");
              getTodos();
            }).catch((error) => {
          console.error("Error writing document: ", error);
        });
        newToDo.value = ""
      } else {
        alert("Please enter the task")
      }
    }

    function getTodos() {
      todos.value = [];
      db.collection("todos")
          .get().then((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          todos.value.push({
            id: doc.id,
            task: doc.data().task,
            done: doc.data().done
          })
          console.log(doc.id, " => ", doc.data());
        })
      }).catch((error) => {
        console.log("Error getting documents: ", error);
      });
    }

    function toggleDone(todo) {
      db.collection("todos").doc(todo.id).update({done: !todo.done})
          .then(() => {
            console.log("Document successfully updated!");
            getTodos();
          })
          .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
    }

    function removeTodo(id) {
      db.collection("todos").doc(id).delete()
          .then(() => {
            console.log("Document successfully deleted!");
            getTodos();
          })
          .catch((error) => {
            console.error("Error removing document: ", error);
          });
    }

    function markAllDone() {
      todos.value.forEach(todo => {
        db.collection("todos").doc(todo.id).update({done: true})
            .then(() => {
              console.log("marked as all done!");
              getTodos();
            })
            .catch((error) => {
              console.error("Error modifying document: ", error);
            });
      });
    }

    function removeDoneTask() {
      todos.value.filter(todo => todo.done).forEach(todo => {
        db.collection("todos").doc(todo.id).delete()
            .then(() => {
              console.log("Document successfully deleted!");
              getTodos();
            })
            .catch((error) => {
              console.error("Error removing document: ", error);
            });
      });
    }

    function removeAll() {
      todos.value.forEach(todo => {
        db.collection("todos").doc(todo.id).delete()
            .then(() => {
              console.log("deleted all task!");
              getTodos();
            })
            .catch((error) => {
              console.error("Error deleting documents: ", error);
            });
      });
    }

    onMounted(() => {
      getTodos();
    })

    return {
      todos,
      newToDo,
      addNewToDo,
      toggleDone,
      removeTodo,
      markAllDone,
      removeDoneTask,
      removeAll
    }
  }
}
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.text-checked {
  text-decoration: line-through;
  color: #ff4f4f;
}

.todo {
  cursor: pointer;
}
</style>
