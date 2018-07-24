<template>
<div class="manga-upload">
  <panel paddingHeader=0 color="#3c66ba" templateCol="1fr">
      <span slot="header" style="padding: 10px;">Upload New Manga</span>
      <div slot="header">
        <custom-button radius=0 width="150px" height="100%" color="#e24c4c">RESET</custom-button><custom-button @click.native="submit" radius=0 width="150px" height="100%" color="#45ae47">SUBMIT</custom-button>
      </div>
    
    <form>
      <div class="left-form">
        <div class="form-control">
          <label for="name">Name</label>
          <input v-model="mangaData.name" id="name" type="text" placeholder="Some awesome text....."/>
        </div>
        <div class="form-control">
          <label for="author">Author</label>
          <input v-model="mangaData.author" id="author" type="text" placeholder="Some awesome text....."/>
        </div>
        <div class="form-control">
          <label for="author">Status</label>
          <select v-model="mangaData.status">
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="dropped">Dropped</option>
          </select>
        </div>
        <div class="form-control">
          <label for="genres">Demographic</label>
          <div class="input-group">
            <input v-model="mangaData.demographic" type="radio" name="demographic" value="shounen"/>Shounen
            <input v-model="mangaData.demographic" type="radio" name="demographic" value="shoujo"/>Shoujo
            <input v-model="mangaData.demographic" type="radio" name="demographic" value="seinen"/>Seinen
            <input v-model="mangaData.demographic" type="radio" name="demographic" value="josei"/>Josei
          </div>
        </div>
        <div class="form-control">
          <label for="genres">Genres</label>
          <ul v-if="mangaData.genreList.length > 0" class="genre-list">
            <li 
              v-for="(genre, index) in mangaData.genreList" 
              :key="genre"
              :id="index"
            >
              <span class="text" v-text="genre"></span><span @click="removeGenre" class="close">x</span>
            </li>
          </ul>
          <input @keyup.space="addGenre" @keyup.enter="addGenre" v-model.trim="genreInput" list="genreData" id="genres" type="text" placeholder="Some awesome text....."/>
          <datalist id="genreData">
            <option value="action"/>
          </datalist>
        </div>
        <div class="form-control">
          <label for="description">Description</label>
          <textarea v-model="mangaData.description" id="description" rows="5" placeholder="Some awesome text....."/>
        </div>
      </div>
      <div class="right-form">
        <img v-if="previewImg" :src="previewImg"/>
        <div class="replace" v-else>
          <font-icon width=50 icon="image"/><span>Cover Image</span>
        </div>
        <div class="form-control">
          <label class="custom-file" for="file-upload">
            <div v-text="filename"></div>
            <div>Browse</div>
          </label>
          <input @change="getFile" id="file-upload" type="file"/>
        </div>
      </div>
    </form>
  </panel>
</div>
</template>

<script>
import CustomButton from '@/CustomButton'
export default {
  name: 'MangaUpload',
  components: {
    CustomButton
  },
  data() {
    return {
      mangaData: {
        name: 'TestName',
        author: 'TestAuthor',
        status: 'ongoing',
        demographic: 'shounen',
        description: 'none...',
        genreList: ['action', 'lele'],
        fileBinary: Object,
      },

      filename: 'Select a file...',
      genreInput: '',
      previewImg: null
    }
  },
  methods: {
    //
    // Get image file and preview it
    //
    getFile(e) {
      if (e.target.files && e.target.files[0]) {
        this.filename = e.target.files[0].name
        this.mangaData.fileBinary = e.target.files[0]
        this.previewImage(this.mangaData.fileBinary)
      }
    },
    previewImage(img) {
      var reader = new FileReader()

      reader.onload = e => {
        this.previewImg = e.target.result
      }
      reader.readAsDataURL(img)
    },
    //
    // Genre control
    //
    addGenre() {
      if (this.genreInput !== '' && !this.mangaData.genreList.includes(this.genreInput)) 
        this.mangaData.genreList.push(this.genreInput.toLowerCase())

      this.genreInput = ''
    },
    removeGenre(e) {
      const index = e.target.parentElement.id
      this.mangaData.genreList.splice(index, 1)
    },
    //
    // Submit
    //
    submit() {
      this.$store.dispatch('createManga', this.mangaData)
      .then(() => {
        console.log('OK')
      })
      .catch(err => {
        console.log(err)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/form';

.manga-upload {
  width: 75%;
  margin: 0 auto;

  form {
    display: grid;
    grid-template-columns: 1fr 1fr;

    .left-form {
      .form-control {
        margin-bottom: 26px;

        ul.genre-list {
          margin-top: 15px;

          li {
            margin-right: 10px;
            margin-bottom: 10px;
            display: inline-block;
            span {
              display: inline-block;
              padding: 10px;

              &.text {
                background-color: #73778c;
              }
              &.close {
                background-color: #ac3d3d;
                cursor: pointer;
              }
            }  
          }
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .right-form {
      text-align: center;

      img {
        max-width: 100%;
      }

      > div.replace {
        display: inline-block;
        background-color: #232323;
        width: 400px;
        line-height: 520px;
        height: 520px;
        color: #c0c0c0;

        svg {
          position: relative;
          top: 15px;
        }

        span {
          margin-left: 15px;
          font-size: 30px;
        }
      }

      > div.form-control {
        margin-top: 15px;
      }
    }
  }
}
</style>
