/* eslint-disable */
<template>
  <div v-if="!state.hideClose || !bugProp.closed" class="bugItem" @click="gotoBugDetails">
    <div class="bugTitle">
      <p>{{ bugProp.title}}</p>
    </div>
    <div class="bugDescription">
      <p>{{ bugProp.creatorEmail }}</p>
      <p v-if="!bugProp.closed" class="greenOpen">Open</p>
      <p v-if="bugProp.closed" class="redClosed">Closed</p>
      <p>{{ bugProp.updatedAt}}</p>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { logger } from '../utils/Logger'
import { bugService } from '../services/BugService'
import { AppState } from '../AppState'
import router from '../router'
export default {
  name: 'BugComponent',
  props: {
    bugProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      hideClose: computed(() => AppState.hideClosed)
    })
    return {
      state,
      async deleteBug() {
        try {
          bugService.deleteBug(props.bugProp.id)
        } catch (error) {
          logger.error(error)
        }
      },
      gotoBugDetails() {
        try {
          router.push({ name: 'BugDetails', params: { id: props.bugProp.id } })
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
.bugItem{
background-color: #fbfbfb;
box-shadow: 0 2px 3px hsl(0deg 0% 4% / 10%), 0 0 0 1px hsl(0deg 0% 4% / 10%);
border-radius: 5px;
display:flex;
flex-basis: auto;
flex-wrap: wrap;
flex-direction: row;
align-items: center;
justify-content: space-between;
height: auto;
width: 100%;
margin: 0 2em 2em;
transition: all .4s ease-in-out;
cursor: pointer;
}

.bugTitle{
  float: left;
  width: 40%;
}

.bugTitle p{
  margin: 1em;
}

.bugDescription{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 60%;
  justify-content: space-between;
}

.bugDescription p{
  margin: 1em;
}

.greenOpen{
  color:green
}
.redClosed{
  color:red
}
</style>
