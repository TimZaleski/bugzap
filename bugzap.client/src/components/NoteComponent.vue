<template>
  <div class="row justify-content-between border-bottom border-bottom-dark">
    <div class="col-10">
      <p>{{ noteProp.content }}</p>
      <h6 v-if="noteProp.creatorEmail">
        By: {{ noteProp.creatorEmail }}
      </h6>
    </div>
    <div class="col-2">
      <button v-if="(noteProp.creatorEmail === state.account.email && !state.activeBug.closed)" type="button" class="btn btn-danger buttonStyle py-1 px-2 m-1" @click="deleteComment">
        X
      </button>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { bugService } from '../services/BugService'
export default {
  name: 'NoteComponent',
  props: {
    noteProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      activeBug: computed(() => AppState.activeBug)
    })
    return {
      state,
      async deleteComment() {
        try {
          if (confirm('Are you sure?')) { await bugService.deleteNote(props.noteProp.bug, props.noteProp.id) }
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
.buttonStyle{
  font-size: 2vh;
}
</style>
