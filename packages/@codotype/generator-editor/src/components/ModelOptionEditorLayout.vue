<template>
  <EditorLayout
    title="Model Options"
    help="Model Options expose an additional layer of configuration for individual generators."
    url="https://github.com/codotype"
    icon="fa-cog"
    button="New Option"
  >

    <!-- New Option Modal -->
    <template slot="modal">
      <b-modal id="new-option" size="lg" :title="'New Model Options'" @ok="createNewOption()" ok-title='Create'>
        <OptionForm :model="newOptionModel" />
      </b-modal>

      <button class="btn btn-lg btn-primary btn-block" v-b-modal="'new-option'">
        <i class="fa fa-plus" />
        Model Option
      </button>
    </template>

    <template slot="list">
      <OptionList />
    </template>

    <template slot="detail">
      <OptionDetail />
    </template>

  </EditorLayout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EditorLayout from '@codotype/ui/src/components/EditorLayout'
import OptionList from './OptionList'
import OptionForm from './OptionForm'
import OptionDetail from './OptionDetail'

export default {
  components: {
    EditorLayout,
    OptionList,
    OptionForm,
    OptionDetail
  },
  created () {
    this.resetNewModel()
  },
  methods: mapActions({
    resetNewModel: 'option/resetNewModel',
    createNewOption: 'option/create'
  }),
  computed: mapGetters({
    newOptionModel: 'option/newModel'
  })
}
</script>
