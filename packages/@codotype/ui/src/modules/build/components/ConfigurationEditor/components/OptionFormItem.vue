<template>
  <div class="row">
    <div class="col-lg-12">

      <span class='d-flex align-items-center'>
        <OptionFormItemIcon class="mr-2" :model="attribute" v-if="attribute.icon" />
        <label class='mb-0'>{{attribute.label}}</label>
        <span class='ml-1 text-danger' v-if="attribute.required">*</span>
        <MoreInfoLink class='mx-3' :url="attribute.more_info_url" />

        <toggle-button
          v-if="attribute.type === DATATYPE_BOOLEAN"
          ref="input"
          :value="getValue({ group: group, schema: schema, attribute: attribute })"
          :color="'#4582EC'"
          class='mr-3 mb-0'
          @change="updateModel()"
        />
      </span>

      <p class='mt-1 mb-0'>
        <small v-html="attribute.help" v-if="attribute.help"></small>
      </p>

    </div>

    <div
      :class="group.icon ? 'col-lg-12 mt-2' : 'col-lg-12'"
      v-if="attribute.type !== DATATYPE_BOOLEAN"
    >
      <input
        v-if="attribute.type === DATATYPE_STRING"
        :value="getValue({ group: group, schema: schema, attribute: attribute })"
        :placeholder="attribute.label"
        class='form-control'
        type="text"
        ref="input"
        @input="setValue({ group: group, schema: schema, attribute: attribute, value: $event.target.value })"
      />

      <select
        v-if="attribute.type === OPTION_TYPE_STRING_SELECT"
        class='form-control'
        :value="getValue({ group: group, schema: schema, attribute: attribute })"
        type="text"
        ref="input"
        @change="setValue({ group: group, schema: schema, attribute: attribute, value: $event.target.value })"
      >
        <option :value="opt.value" v-for="opt in attribute.options" :key="opt.id">{{opt.label}}</option>
      </select>

      <OptionTemplateWrapper
        class='mt-2'
        v-if="attribute.previewTemplate"
        :model="{ value: getValue({ group: group, schema: schema, attribute: attribute }) }"
        :schema="schema"
        :template="attribute.previewTemplate"
        :tooltip="attribute.previewTooltip"
      >
      </OptionTemplateWrapper>

    </div>
  </div>
</template>

<script>
import {
  DATATYPE_STRING,
  DATATYPE_BOOLEAN,
  DATATYPE_INTEGER,
  DATATYPE_FLOAT
} from '@codotype/types/lib/datatypes'

import {
  OPTION_TYPE_STRING_SELECT,
} from '@codotype/types/lib/configuration-option-types'
// TODO - update to point at option-types.js

import {
  CONFIGURATION_GROUP_TYPE_OPTION,
  CONFIGURATION_GROUP_TYPE_ADDON,
  CONFIGURATION_GROUP_SCOPE_GLOBAL,
  CONFIGURATION_GROUP_SCOPE_SCHEMA
} from '@codotype/types/lib/configuration-group-types'

import OptionTemplateWrapper from './OptionTemplateWrapper'
import MoreInfoLink from '../../../../../components/MoreInfoLink'
import OptionFormItemIcon from './OptionFormItemIcon'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'OptionFormitem',
  props: {
    group: { required: true },
    schema: { required: false },
    attribute: { required: true }
  },
  components: {
    OptionTemplateWrapper,
    OptionFormItemIcon,
    MoreInfoLink
  },
  beforeCreate () {
    // Isolates the 'module' prop
    let group = this.$options.propsData.group
    let schema = this.$options.propsData.schema
    let attribute = this.$options.propsData.attribute

    function updateModel () { // NOTE - DOES NOT WORK WITH ADDONS!
      if (this.attribute.type === DATATYPE_BOOLEAN) {
        this.setValue({
          group: this.group,
          schema: this.schema,
          attribute: this.attribute,
          value: this.$refs.input.toggled
        })
      } else if ([DATATYPE_INTEGER, DATATYPE_FLOAT].includes(this.attribute.type)) {
        this.setValue({
          group: this.group,
          schema: this.schema,
          attribute: this.attribute,
          value: Number(this.$refs.input.value)
        })
      } else {
        this.setValue({
          group: this.group,
          schema: this.schema,
          attribute: this.attribute,
          value: this.$refs.input.value
        })
      }
    }

    // GLOBAL + CONFIGURATION_GROUP_TYPE_OPTION
    if (group.type === CONFIGURATION_GROUP_TYPE_OPTION && group.scope === CONFIGURATION_GROUP_SCOPE_GLOBAL) {
      // Defines Vue.component.computed
      this.$options.computed = mapGetters({
        getValue: 'build/editor/optionValue'
      })

      // Defines Vue.component.methods
      // TODO - update other 3 methods to use `mapActions`
      this.$options.methods = {
        updateModel,
        ...mapActions({
          setValue: 'build/editor/setOptionValue'
        })
      }
    } else if (group.type === CONFIGURATION_GROUP_TYPE_OPTION && group.scope === CONFIGURATION_GROUP_SCOPE_SCHEMA) {

      // Defines Vue.component.computed
      this.$options.computed = mapGetters({
        getValue: 'build/editor/modelOptionValue'
      })

      // Defines Vue.component.methods
      this.$options.methods = {
        updateModel,
        ...mapMutations({
          setValue: 'build/editor/modelOptionValue'
        })
      }
    } else if (group.type === CONFIGURATION_GROUP_TYPE_ADDON && group.scope === CONFIGURATION_GROUP_SCOPE_SCHEMA) {
      // Defines Vue.component.computed
      this.$options.computed = mapGetters({
        getValue: 'build/editor/model_addon/newModelAttr'
      })

      // Defines Vue.component.methods
      this.$options.methods = {
        updateModel,
        ...mapMutations({
          setValue: 'build/editor/model_addon/newModelAttr'
        })
      }
    } else if (group.type === CONFIGURATION_GROUP_TYPE_ADDON && group.scope === CONFIGURATION_GROUP_SCOPE_GLOBAL) {
      // Defines Vue.component.computed
      this.$options.computed = mapGetters({
        getValue: 'build/editor/global_addon/newModelAttr'
      })

      // Defines Vue.component.methods
      this.$options.methods = {
        updateModel,
        ...mapMutations({
          setValue: 'build/editor/global_addon/newModelAttr'
        })
      }
    }
  },
  data () {
    return {
      DATATYPE_STRING,
      OPTION_TYPE_STRING_SELECT,
      DATATYPE_BOOLEAN,
      DATATYPE_INTEGER,
      DATATYPE_FLOAT
    }
  }
}
</script>
