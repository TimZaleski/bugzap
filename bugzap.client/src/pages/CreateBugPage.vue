/* eslint-disable */
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="createBug">
            <div class="form-group">
              <div class="row">
                  <div class="col-12">
                    <input type="text"
                     name="Bug Title"
                     id="BugTitle"
                     class="form-control inputStyle"
                     placeholder="Bug title"
                     v-model="state.newBug.title"
                     required="required"
              >
                  </div>
              </div>
              <div class="row">
                  <div class="col-12">
                    <textarea
                     name="Bug Description"
                     id="BugDescription"
                     class="form-control inputStyle"
                     rows=6
                     cols=50
                     placeholder="Description"
                     v-model="state.newBug.description"
                     required="required"
              ></textarea>
                  </div>
              </div>
              <div class="row">
                  <div class="col-12 justify-content-between">
                    <button type="submit" class="buttonStyle">
                      Create
                    </button>
                    <router-link :to="{ name: 'Home' }">
                      <button class="buttonStyle">Cancel</button>
                    </router-link>
                  </div>
              </div>
            </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugService } from '../services/BugService'
import router from '../router'
export default {
  name: 'CreateBug',
  setup() {
    const state = reactive({
      newBug: {},
      user: computed(() => AppState.user)
    })
    return {
      state,
      async createBug() {
        try {
          await bugService.createBug(state.newBug)
          router.push({ name: 'BugDetails', params: { id: AppState.createdBug.id } })
          state.newBug = {}
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

.buttonStyle
{
  margin: 1em;
  margin-right: 10%;
  margin-left: 10%;
}
</style>
