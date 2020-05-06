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
        <div class="user-info">
          <UserAvatar :user="slotProps.item" />
          {{ slotProps.item.name }} ({{ slotProps.item.username }})
        </div>
      </template>
      <template v-slot:option="slotProps">
        <div class="user-info">
          <UserAvatar :user="slotProps.option" />
          {{ slotProps.option.name }} ({{ slotProps.option.username }})
        </div>
      </template>
    </MultiSelect>
  </b-modal>
</template>
<script>
import KeyValue from "@/components/common/KeyValue";
import Checkbox from "@/components/Checkbox/Checkbox";
import MultiSelect from '@/components/MultiSelect/MultiSelect';
import UserService from '@/services/user.service';
import UserAvatar from "@/components/common/UserAvatar";
import {cloneDeep} from 'lodash';

export default {
  name: 'MeetingSettings',
  components: {
    KeyValue,
    Checkbox,
    MultiSelect,
    UserAvatar,
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
        profilePic: x.profilePic,
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
<style lang="scss" scoped>
.user-info {
  display: flex;
    align-items: center;
    padding: 4px 0;
}
</style>