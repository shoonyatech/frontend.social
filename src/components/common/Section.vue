<template>
  <div
    :key="componentKey"
    class="section-box"
  >
    <span class="section-title">
      {{ title }}
      <img
        v-if="!editMode && isEditable"
        :src="`/images/edit.svg`"
        alt="Edit"
        class="icon-button edit"
        title="Edit"
        @click="edit"
      >
    </span>
    <div class="content">
      <slot />
      <div class="buttons">
        <button
          v-if="editMode"
          class="save-button"
          @click="save"
        >
          Save
        </button>
        <button
          v-if="editMode"
          @click="cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import EditableValue from '@/components/common/EditableValue';

export default {
	components: {},
	props: {
		title: {
			type: String,
			default: '',
		},
		isEditable: {
			type: Boolean,
			default: true,
		},
		onEdit: {
			type: Function,
			default: null,
		},
		onSave: {
			type: Function,
			default: null,
		},
		onCancel: {
			type: Function,
			default: null,
		},
	},
	data() {
		return {
			editMode: false,
			componentKey: 0,
		};
	},
	methods: {
		edit: function (event) {
			this.editMode = true;
			if (this.onEdit) {
				this.onEdit();
			}
		},
		save: function (event) {
			this.editMode = false;
			if (this.onSave) {
				this.onSave();
			}
		},
		cancel: function (event) {
			this.editMode = false;
			if (this.onCancel) {
				this.onCancel();
			}
		},
		refresh() {
			this.componentKey += 1;
		},
	},
};
</script>

<style scoped lang="scss">
.section-box {
	border: 2px solid #114273;
	margin: 0 auto;
	text-align: left;
}

.content {
	padding: 0 15px 10px 15px;
}

.section-title {
	background: #114273;
	color: #fff;
	border: none;
	padding: 4px 15px;
	margin-bottom: 12px;
	width: 100%;
	display: inline-block;
}

.edit {
	float: right;
}

.buttons {
	margin-top: 10px;
	width: 100%;
	text-align: right;
}

.save-button {
	margin-right: 10px;
}

.icon-button {
	height: 30px;
	padding: 5px;
	cursor: pointer;
	background-color: #c0e0ff;
	border-radius: 9px;
	border-width: solid transparent 1px;
}
</style>
