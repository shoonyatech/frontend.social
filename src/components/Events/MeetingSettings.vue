<template>
  <b-modal
    v-model="open"
    scrollable
    @ok="onOk"
    @change="onChange"
  >
    <KeyValue
      label="Name"
      :is-editable="true"
      :value="name"
      @change="onNameChange"
    />
    <Checkbox
      id="isPrivate"
      label="Restricted Access"
      :is-checked="isPrivate"
      :on-click="() => { isPrivate = !isPrivate }"
    />
    <MultiSelect
      :is-editable="true"
      :items.sync="users"
      :search-fn="searchUsers"
    >
      <template v-slot:default="slotProps">
        {{ slotProps.item.name }} ({{ slotProps.item.username }})
      </template>
      <template v-slot:option="slotProps">
        {{ slotProps.option.name }} ({{ slotProps.option.username }})
      </template>
    </MultiSelect>
  </b-modal>
</template>
<script>
import KeyValue from "@/components/common/KeyValue";
import Checkbox from "@/components/Checkbox/Checkbox";
import MultiSelect from '@/components/MultiSelect/MultiSelect';
import UserService from '@/services/user.service';
import {cloneDeep} from 'lodash';

export default {
  name: 'MeetingSettings',
  components: {
    KeyValue,
    Checkbox,
    MultiSelect
  },
  props: {
    meeting: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      open: true,
      name : '',
      isPrivate: false,
      users: [{
      }]
    }
  },
  created() {
    this.name = this.meeting.title;
    this.isPrivate = this.meeting.isPrivate || false;
    this.users = cloneDeep(this.meeting.allowedUsers || []);
  },
  methods: {
    onNameChange(event) {
      this.name = event.value;
    },
    onOk() {
      const allowedUsers = this.users.map(x => ({
        _id: x._id,
        name: x.name,
        username: x.username,
      }))
      const {meetingId} = this.meeting;
      this.$emit('ok', {title : this.name, isPrivate: this.isPrivate, allowedUsers: allowedUsers, meetingId})
    },
    async searchUsers(query) {
      return UserService.getAllUsers(query);
    },
    onChange(event) {
      if (!event) {
        this.$emit('cancel')
      }
    }
  }, 
}
</script>