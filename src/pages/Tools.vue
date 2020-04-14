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
              <span
                v-for="(tech, index) in tool.technologies"
                :key="index"
              >
                <a class="body-title">{{ tech }}</a><span
                  v-if="index+1 < tool.technologies.length"
                  class="body-title"
                >, </span>
              </span>
              <div class="subtitle">
                <div class="mb-2">
                  {{ tool.review }}
                </div>
              </div>
              <div class="subtitle">
                Reviews:
                <div
                  v-for="review in tool.userReviews"
                  :key="review.index"
                  class="mb-2"
                >
                  <div>
                    {{ review.username }} : 
                    {{ review.review }}
                  </div>
                </div>
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
export default {
  name: 'Tools',
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
                        "username":"user1",
                        "review":"The tool provides lot of integration with online editors"
                      },
                      {
                        "username":"user2",
                        "review":"Difficult to use. Not recommended"
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
                        "username":"user1",
                        "review":"The tool provides lot of integration with online editors"
                      },
                      {
                        "username":"user2",
                        "review":"Difficult to use. Not recommended"
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
                        "username":"user1",
                        "review":"The tool provides lot of integration with online editors"
                      },
                      {
                        "username":"user2",
                        "review":"Difficult to use. Not recommended"
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
</style>
