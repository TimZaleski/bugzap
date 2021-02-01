/* eslint-disable */
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <p>Title</p>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h3>{{state.activeBug.title}}</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-12 bugsContainer">
        <div><p>Reported By: </p>
        <h3>{{state.activeBug.creatorEmail}}</h3></div>
        <h3 v-if="!state.activeBug.closed" class="greenOpen">Open</h3>
        <h3 v-if="state.activeBug.closed" class="redClosed">Closed</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="descriptionBox"><p class="desc">{{state.activeBug.description}}</p></div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <button
          class="btn btn-outline-primary text-uppercase buttonStyle"
          @click="closeBug"
          v-if="state.user.email === state.activeBug.creatorEmail && !state.activeBug.closed"
        >
          Close Bug
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h3>Notes</h3>
      </div>
    </div>
    <div class="row">
      <!-- <NoteComponent v-for="note in state.notes" :key="note.id" :note-prop="note" /> -->
    </div>
    <div class="row">
      <div class="col-12" v-if="!state.activeBug.closed">
        <button
          class="btn btn-outline-primary text-uppercase buttonStyle"
          data-toggle="modal"
          data-target="#createNoteModal"
          v-if="!state.activeBug.closed"
        >
          Add Note
        </button>
        <NoteModalComponent :bug-prop="state.activeBug" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugService } from '../services/BugService'
import { useRoute } from 'vue-router'
export default {
  name: 'BugDetails',
  setup() {
    const route = useRoute()
    const state = reactive({
      activeBug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes),
      user: computed(() => AppState.user)
    })
    onBeforeMount(async() => {
      try {
        await bugService.getBugById(route.params.id)
        await bugService.getNotesByBugId(route.params.id)
        console.log(AppState.notes)
      } catch (error) {
        console.log(error)
      }
    })
    return {
      state,
      async closeBug() {
        try {
          if (confirm('Are you sure?')) { await bugService.deleteBug(state.activeBug, state.activeBug.id) }
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.inputStyle{
  font-size: 1.25em;
  margin-right: 10%;
  margin-left: 10%;
  height: auto;
  width: 60vw;
  margin: 1em;
}

.bugsContainer{
  font-size: 1.25em;
  padding-top: 1em;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}

.buttonStyle
{
  margin: 1em;
  margin-left: 90%;
  font-size: 1.25em;
}

.greenOpen{
  color:green;
  float: right;
  margin: 1em;
  margin-right: 10%;
  margin-left: 10%;
}
.redClosed{
  color:red;
  float: right;
  margin: 1em;
  margin-right: 10%;
  margin-left: 10%;
}

.descriptionBox{
  border: 2px;
  border-style: solid;
}

.desc{
  margin: 1em;
}

.noteContainer{
  border: 2px;
  border-style: solid;
}
</style>
