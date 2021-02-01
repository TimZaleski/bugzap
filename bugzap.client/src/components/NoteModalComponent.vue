<template>
  <div class="NoteModal">
    <!-- Modal -->
    <div class="modal fade"
       id="createNoteModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="createNoteModal"
       aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Add Note
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="formatForm"  @submit.prevent="createNote">
              <div class="form-group">
                <textarea
                  id="body"
                  name="body"
                  rows="8"
                  placeholder="Note"
                  class="form-control"
                  aria-describedby="helpId"
                  cols="50"
                  v-model="state.newNote.content">
                </textarea>
                <button class="btn btn-success" type="submit">
                  Create
                </button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" id="closeModal" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { bugService } from '../services/BugService'
import { logger } from '../utils/Logger'
export default {
  name: 'NoteModalComponent',
  props: {
    bugProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      newNote: {}
    })
    return {
      state,
      async createNote() {
        try {
          state.newNote.bug = props.bugProp
          await bugService.createNoteForBug(state.newNote, props.bugProp)
          state.newNote = {}
          document.getElementById('closeModal').click()
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style>

</style>
