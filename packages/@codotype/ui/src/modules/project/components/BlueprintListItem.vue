<template>
  <div class='col-lg-4 mb-4'>
    <div class="card card-body shadow-hover border-light">
      <div class="row align-items-center">

        <div class="col-lg-12 text-center">
          <p class="lead mb-0">
            <router-link :to="'/blueprints/' + project._id ">{{project.label}}</router-link>
          </p>
          <small class="text-muted">
            <!-- Last edited 9 / 2 / 18 -->
            {{ project.schemas.length }} {{ project.schemas.length === 1 ? 'Model' : 'Models' }}
          </small>
        </div>

        <div class="col-lg-12">
          <hr>
        </div>

        <div class="col-lg-12 text-center">

          <router-link
            :to="'/blueprints/' + project._id + '/generate'"
            class="mx-1"
            v-b-tooltip.hover.left
            title='Generate'
            @click="goToBuild(project)"
          >
            <i class="fa fa-code project-action project-action-primary fa-fw" />
          </router-link>

          <span class="mx-1" v-b-tooltip.hover.left title='Export' @click="exportApp(project)">
            <i class="fa fa-download project-action project-action-primary fa-fw" />
          </span>

          <span class="mx-1" v-b-tooltip.hover.left title='Duplicate' v-b-modal="'clone_modal_' + project._id">
            <i class="fa fa-copy project-action project-action-success fa-fw" />
          </span>

          <span class="mx-1 text-hover-danger" v-b-tooltip.hover.left title='Delete' v-b-modal="'destroy_modal_' + project._id">
            <i class="fa fa-trash project-action project-action-danger fa-fw" />
          </span>

          <!-- Destroy Modal -->
          <b-modal
            lazy
            :id="'destroy_modal_' + project._id"
            :title="'Destroy ' + project.label + '?'"
            @ok="destroyProject(project)"
            ok-variant='danger'
            ok-title='DESTROY'
            cancel-title='Cancel'
          >
            <p class="text-left">Are you sure you want to destroy the {{ project.label }} Blueprint?</p>
          </b-modal>

          <!-- Clone Modal -->
          <b-modal
            lazy
            :id="'clone_modal_' + project._id"
            :title="'Duplicate ' + project.label + '?'"
            @ok="cloneBlueprint(project)"
            ok-variant='success'
            ok-title='Duplicate'
            cancel-title='Cancel'
          >
            <p class="text-left">Are you sure you want to duplicate the {{ project.label }} Blueprint?</p>
          </b-modal>


        </div>

      </div>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapActions } from 'vuex'

export default {
  props: ['project'],
  methods: mapActions({
    destroyProject: 'blueprint/destroy',
    selectBuildApp: 'build/selectApp',
    exportApp: 'blueprint/exportJson',
    cloneBlueprint: 'blueprint/clone'
  })
}
</script>

<style lang='sass'>
@import '../../../sass/vendor.sass'

i.project-action
  color: $gray-300
  transition: color .25s ease-in

  &.project-action-danger
    &:hover
      color: $red

  &.project-action-success
    &:hover
      color: $green

  &.project-action-primary
    &:hover
      color: $blue

  &.project-action-secondary
    &:hover
      color: $gray-600

</style>
