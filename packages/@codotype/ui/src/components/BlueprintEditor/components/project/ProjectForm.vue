<template>
  <!-- <div class="card card-body shadow-sm"> -->
  <b-row class='align-items-center justify-content-center'>
    <b-col lg=12>

      <!-- <h4>Project Name</h4> -->

      <p class="small mt-2 mb-3 text-muted"><span class="text-success">Project Name</span> must be <strong>alphabetic</strong> - no numbers or symbols, but whitespace is allowed. The input field will enforce proper capitalization and spacing.</p>

      <small class="mb-2 text-muted">
        <i class="far fa-lightbulb" />
        Try something simple like <code>Todo List</code>, or <code>Inventory Manager</code>
      </small>

      <input
        ref="input_el"
        id="project-label"
        class="form-control form-control-lg"
        v-model="projectLabel"
        placeholder="Project Name"
        @keyup.enter="onKeyEnter()"
      />

      <small class="text-muted">Identifier: {{identifier || 'project_name'}}</small>

      <p class="small mt-2 text-muted">
        <strong>Codotype</strong> uses the <span class='text-success'>Project Name</span> for naming things like <strong>files</strong>, <strong>folders</strong>, <strong>namespaces</strong>, and <strong>databases</strong>. No need to be picky, you can rename your Project whenever you like <i class="far fa-laugh" />
      </p>

      <HelpPopover
        target="project-label"
        placement="left"
        content='Give your project a name'>
      </HelpPopover>

      <HelpPopover
        target="submit-project-form"
        placement="left"
        content='Click here to continue'>
      </HelpPopover>

      <!-- <b-button
        size="lg"
        id="submit-project-form"
        block
        variant="primary"
        :disabled="!enableSubmit"
        @click="incrementStep()"
      > -->
        <!-- Define Schemas -->
        <!-- <ChevronAnimation :active="enableSubmit" /> -->
      <!-- </b-button> -->

    </b-col>
  </b-row>
  <!-- </div> -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import HelpPopover from '../../../HelpPopover'
import ChevronAnimation from '../../../ChevronAnimation'

export default {
  name: 'ProjectForm',
  components: {
    HelpPopover,
    ChevronAnimation
  },
  mounted () {
    setTimeout(() => { this.$refs.input_el.focus() }, 200) // Minor delay for input element focus
  },
  computed: {
    ...mapGetters({
      label: 'editor/project/editLabel',
      identifier: 'editor/project/editIdentifier',
      disableSubmit: 'editor/project/disableSubmit'
    }),
    projectLabel: {
      get () {
        return this.label
      },
      set (label) {
        this.$store.dispatch('editor/project/setEditLabel', label)
      }
    }
  },
  methods: {
    ...mapActions({
      submitForm: 'editor/project/submitForm'
    }),
    onKeyEnter () {
      if (this.disableSubmit) return
      this.submitForm()
    }
  }
}
</script>
