<template>
  <b-container>
    <b-row>
      <b-col
        md="7"
        offset-md="1"
      >
        <div
          v-for="section in sections"
          :key="section.index"
        >
          <h1>
            <span>{{ section.name }}</span>
          </h1>
          <b-row
            v-for="tool in section.tools"
            :key="tool.index"
          >
            <b-col md="1">
              <img
                :src="`/images/up.svg`"
                alt=""
                class="up-down-arrow cursor-pointer"
                @click="upRating"
              >
              {{ tool.upRating - tool.downRating }}
              <img
                :src="`/images/down.svg`"
                alt=""
                class="up-down-arrow cursor-pointer"
                @click="downRating"
              >
            </b-col>
            <b-col
              md="1"
              class="p-0"
            >
              <img
                :src="tool.icon"
                class="w-100"
                alt=""
              >
            </b-col>
            <b-col
              md="9"
              :class="{ 'tool-box' : section.tools.length > 1, 'mb-5' : section.tools.length > 1, 'mb-1' : section.tools.length === 1 }"
            >
              <h2 class="caption">
                {{ tool.name }}
              </h2>
              <SkillTags
                v-if="tool.technologies"
                :skills="tool.technologies"
              />
              <div class="subtitle">
                <div class="mb-2">
                  {{ tool.review }}
                </div>
              </div>
              <div class="subtitle color-gray">
                Reviews
                <add-comment
                  :on-save="saveComment"
                  :show-rating="false"
                  class="mt-1"
                />
                <b-col md="12 mb-2">
                  <Comment
                    v-for="(review, index) in tool.userReviews"
                    :key="index"
                    :comment="review"
                    :show-rating="false"
                  />
                </b-col>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-col>
      <b-col md="2" />
    </b-row>
  </b-container>
</template>

<script>
import SkillTags from "@/components/Skills/SkillTags";
import AddComment from "@/components/Comment/AddComment";
import Comment from "@/components/Comment/Comment";

export default {
  name: 'Tools',
  components: {
    SkillTags,
    AddComment,
    Comment
  },
  data () {
    return {
      sections:[
          {
            name:"Requirements",
            tools:[
                {
                  name: "Trello",
                  icon: "/images/trello.png",
                  upRating: 16,
                  downRating: 4,
                  review: "some large text review here",
                  technologies: [
                      "react",
                      "react native"
                  ],
                  userReviews: [
                      {
                        username: "user1",
                        comment :"The tool provides lot of integration with online editors"
                      },
                      {
                        username: "user2",
                        comment :"Difficult to use. Not recommended"
                      }
                  ]
                }
            ]
          },
          {
            name: "Design",
            tools: [
                {
                  name: "Figma",
                  icon: "/images/figma.png",
                  upRating: 16,
                  downRating: 4,
                  review: "some large text review here",
                  technologies: [
                      "react",
                      "react native"
                  ],
                  userReviews:[
                      {
                        username: "user1",
                        comment: "The tool provides lot of integration with online editors"
                      },
                      {
                        username: "user2",
                        comment: "Difficult to use. Not recommended"
                      }
                  ]
                }, 
          {
                  name: "Sketch",
                  icon: "/images/sketch.png",
                  upRating: 16,
                  downRating: 4,
                  review: "some large text review here",
                  technologies: [
                      "react",
                      "react native"
                  ],
                  userReviews:[
                      {
                        username: "user1",
                        comment: "The tool provides lot of integration with online editors"
                      },
                      {
                        username: "user2",
                        comment: "Difficult to use. Not recommended"
                      }
                  ]
                }
            ]
          }
      ]
    }
  },
  methods: {
    upRating () {
      console.log('up');
    },
    downRating () {
      console.log('down');
    }
  }
}
</script>

<style scoped>
h2.caption {
  font-weight: normal;
  font-size: 22px;
}
.subtitle {
  font-size: 18px;
}
.body-title {
  font-size: 16px;
}
.tool-box {
  border-bottom: 1px solid #aada18;
}
.up-down-arrow {
  height: 25px;
  width: auto;
}
.cursor-pointer {
  cursor: pointer;
}
.color-gray {
  color: grey;
}
</style>
