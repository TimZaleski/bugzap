<template>
<div>
  <div class="checkboxStyle">
  <label for="HideChecked">Hide Closed </label>
  <input type="checkbox"
                     name="Hide Checked"
                     id="HideChecked"
                     @change="toggleHide"
              >
  </div>
</div>
  <div class="bugsContainer">
    <BugComponent v-for="bug in state.bugs" :key="bug.id" :bug-prop="bug" />
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { bugService } from '../services/BugService'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      user: computed(() => AppState.user)
    })
    onMounted(async() => {
      try {
        await bugService.getAllBugs()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      toggleHide(e) {
        AppState.hideClosed = e.target.checked
      }
    }
  }
}
</script>

<style scoped lang="scss">

.bugsContainer{
  font-size: 1.25em;
  padding-top: 1em;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.checkboxStyle
{
  float: right;
  font-size: 1.25em;
}

.checkboxStyle input
{
  margin: 1em;
}
</style>
