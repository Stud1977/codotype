<template>
  <b-row>
    <b-col lg=12>

      <p class="mb-1 mx-1 text-muted d-flex justify-content-between">
        <span>
          <i class="fa fa-link mr-2" />
          <strong>Incoming Relations</strong>
        </span>
        <i class="fa fa-info-circle" v-b-tooltip.left.hover="`Relations which reference the ${model.label} Schema`" />
      </p>

      <ul class="list-group">

        <b-list-group-item class="text-center" v-if="!reverse_relations[0]">
          <strong class="mb-0 mt-1 text-muted">No Incoming Relations</strong>
          <br>
          <small class="text-muted">Relations which reference the {{ model.label }} Schema</small>
        </b-list-group-item>

        <li class="list-group-item" v-for="rel in reverse_relations" v-else>
          <small>
            <RelationBadge slim direction="in" :model="rel" />
          </small>
        </li>
      </ul>

    </b-col>
  </b-row>

</template>

<script>
import { mapGetters } from 'vuex'
import RelationBadge from '../relation/RelationBadge'

export default {
  name: 'SchemaIncomingRelations',
  components: {
    RelationBadge
  },
  computed: {
    ...mapGetters({
      model: 'editor/schema/selectedModel',
      inflatedSelectedModel: 'editor/schema/inflatedSelectedModel',
      schemas: 'editor/schema/collection/items'
    }),
    reverse_relations () {
      return this.inflatedSelectedModel.reverse_relations
    }
  }
}
</script>

<style lang='sass' scoped>
  li.list-group-item
    padding: 0.25rem 0.5rem
</style>
