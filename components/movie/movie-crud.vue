<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :sort-by="[{ key: 'total_view', order: 'asc' }]"
    :hover="true"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <h2 class="font-bold text-xl ml-4">Danh sách phim</h2>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <CommonButton :width="160" title="Thêm phim mới"></CommonButton>
          </template>
          <!-- <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Tên phim"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedItem.thumb_url"
                      label="Thumbnail"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedItem.type"
                      label="Thể loại"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedItem.country"
                      label="Quốc gia"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedItem.total_view"
                      label="Lượt xem"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card> -->
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.thumb_url="{ item }">
      <img class="h-[100px]" :src="item.thumb_url" alt="" />
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
const data = [
  {
    _id: '63e792180410ec32e64d5a0b',
    name: 'Sự Trả Thù Của Người Thứ 3',
    origin_name: 'Revenge of Others',
    thumb_url:
      'https://img.hiephanhthienha.com/uploads/movies/su-tra-thu-cua-nguoi-thu-3-thumb.jpg',
    poster_url:
      'https://img.hiephanhthienha.com/uploads/movies/su-tra-thu-cua-nguoi-thu-3-poster.jpg',
    type: 'series',
    slug: 'su-tra-thu-cua-nguoi-thu-3',
    year: 2022,
    country: 'Hàn Quốc',
    content:
      'Một cậu bé rơi xuống chết ở trường, nhưng Ok Chanmi không tin rằng anh trai sinh đôi của cô, Park Wonseok, đã tự tử. Chanmi chuyển đến trường của anh trai cô, Yongtan High, và gặp Ji Sooheon, người đã chứng kiến ​​cái chết của anh trai cô.',
    quality: 'HD',
    lang: 'Vietsub',
    category: ['Chính kịch'],
    actor: [
      'Kim Yoo-Jin',
      'Lomon',
      'Seo Ji-Hoon',
      'Chae Sang-Woo',
      'Lee Soo-Min',
      'Chung Su-Bin',
      'Kim Joo-Ryung',
      'Woo Yeon',
    ],
    director: ['Kim Yoo-Jin'],
    status: 'completed',
    time: '60 phút/tập',
    episode_total: '12 Tập',
    episode_current: 'Hoàn Tất (12/12)',
    episodes: [
      {
        name: '1',
        slug: '1',
        filename:
          'Revenge.of.Others.S01E01.2022.Disney.WEB-DL.1080p.H264.DDP-Vietsub_adm820',
        link_embed:
          'https://hd.1080phim.com/share/e9527aec68523b8ceb74e12b8685b96a',
        link_m3u8: 'https://hd.1080phim.com/20221111/28048_f8c36958/index.m3u8',
        _id: '63e792180410ec32e64d5a0c',
      },
      {
        name: '2',
        slug: '2',
        filename:
          'Revenge.of.Others.S01E02.2022.Disney.WEB-DL.1080p.H264.DDP-Vietsub_adm820',
        link_embed:
          'https://hd.1080phim.com/share/ddf20ca99b0ddd9a0e505ed7830ea299',
        link_m3u8: 'https://hd.1080phim.com/20221111/28049_9080ac33/index.m3u8',
        _id: '63e792180410ec32e64d5a0d',
      },
      {
        name: '3',
        slug: '3',
        filename:
          'Revenge.of.Others.S01E03.2022.Disney.WEB-DL.1080p.H264.DDP-Vietsub_adm820',
        link_embed:
          'https://hd.hdbophim.com/share/8803f7fa56465a59d0c1a12ec666f533',
        link_m3u8: 'https://hd.hdbophim.com/20221118/26172_3b2c3b10/index.m3u8',
        _id: '63e792180410ec32e64d5a0e',
      },
      {
        name: '4',
        slug: '4',
        filename:
          'Revenge.of.Others.S01E04.2022.Disney.WEB-DL.1080p.H264.DDP-Vietsub_adm820',
        link_embed:
          'https://hd.hdbophim.com/share/0594763bf6171668f8bc4cd79ebcbd63',
        link_m3u8: 'https://hd.hdbophim.com/20221118/26173_56949791/index.m3u8',
        _id: '63e792180410ec32e64d5a0f',
      },
      {
        name: '5',
        slug: '5',
        filename:
          'Revenge.of.Others.S01E05.2022.Disney.WEB-DL.1080p.H264.DDP-Vietsub_adm820',
        link_embed:
          'https://hd.hdbophim.com/share/22b880633e6c3b3c7bccc56c59ff11b9',
        link_m3u8: 'https://hd.hdbophim.com/20221126/26426_1aaba25f/index.m3u8',
        _id: '63e792180410ec32e64d5a10',
      },
      {
        name: '6',
        slug: '6',
        filename:
          'Revenge.of.Others.S01E06.2022.Disney.WEB-DL.1080p.H264.DDP-Vietsub_adm820',
        link_embed:
          'https://hd.hdbophim.com/share/7061e05fd01005f38567bfe463f680ed',
        link_m3u8: 'https://hd.hdbophim.com/20221126/26427_3e73b37d/index.m3u8',
        _id: '63e792180410ec32e64d5a11',
      },
      {
        name: '7',
        slug: '7',
        filename:
          'Revenge.of.Others.S01E07.2022.Disney.WEB-DL.1080p.H264.DDP-HDCTV (1)',
        link_embed:
          'https://hd.1080phim.com/share/f82eedc57df33f85b6938f71ed72032f',
        link_m3u8: 'https://hd.1080phim.com/20221202/29148_bcf78348/index.m3u8',
        _id: '63e792180410ec32e64d5a12',
      },
      {
        name: '8',
        slug: '8',
        filename:
          'Revenge.of.Others.S01E08.2022.Disney.WEB-DL.1080p.H264.DDP-HDCTV (1)',
        link_embed:
          'https://hd.1080phim.com/share/9d1045d1219ce20574fcc07162f346e6',
        link_m3u8: 'https://hd.1080phim.com/20221202/29149_fbb02053/index.m3u8',
        _id: '63e792180410ec32e64d5a13',
      },
      {
        name: '9',
        slug: '9',
        filename:
          'Revenge.of.Others.S01E09.2022.Disney.WEB-DL.1080p.H264.DDP-Vietsub_adm820',
        link_embed:
          'https://1080.hdphimonline.com/share/b9539626d37f52bcdf87c0e671329cbb',
        link_m3u8:
          'https://1080.hdphimonline.com/20221212/39482_3c98512e/index.m3u8',
        _id: '63e792180410ec32e64d5a14',
      },
      {
        name: '10',
        slug: '10',
        filename:
          'Revenge.of.Others.S01E10.2022.Disney.WEB-DL.1080p.H264.DDP-Vietsub_adm820',
        link_embed:
          'https://1080.hdphimonline.com/share/55b0dce57b47df0013b6bfdfd5636f3f',
        link_m3u8:
          'https://1080.hdphimonline.com/20221212/39483_ba59bebe/index.m3u8',
        _id: '63e792180410ec32e64d5a15',
      },
      {
        name: '11',
        slug: '11',
        filename:
          'Revenge.of.Others.S01E11.2022.Disney.WEB-DL.1080p.H264.DDP-Vietsub_adm820',
        link_embed:
          'https://hd.hdbophim.com/share/5abad9111ffcd62ba77847ae11e1ae65',
        link_m3u8: 'https://hd.hdbophim.com/20221221/27623_af3b01c9/index.m3u8',
        _id: '63e792180410ec32e64d5a16',
      },
      {
        name: '12',
        slug: '12',
        filename:
          'Revenge.of.Others.S01E12.2022.Disney.WEB-DL.1080p.H264.DDP-Vietsub_adm820',
        link_embed:
          'https://hd.hdbophim.com/share/0171506e0818c24f1c01d1aafc5de8ff',
        link_m3u8: 'https://hd.hdbophim.com/20221221/27624_9c0efd1b/index.m3u8',
        _id: '63e792180410ec32e64d5a17',
      },
    ],
    comments: [
      {
        userComment: {
          _id: '63eca9fea099b1e86a2b748a',
          username: 'Admin_sonvng',
          avatar: 'https://chingizpro.github.io/portfolio/img/person.png',
          isAdmin: true,
        },
        commentContent:
          'Hãy chia sẻ ý kiến của bạn về bộ phim này bằng cách để lại một comment dưới đây. Nếu có bất kì lỗi gì khi xem phim, chúng tôi mong nhận được sự phản hồi từ mọi người để cải thiện website sớm nhất. Thanks for all 💛',
        createAt: '2023-02-17T03:06:57.682Z',
        _id: '63eeef5199fd966ed792bbb6',
      },
      {
        userComment: {
          _id: '63eca9fea099b1e86a2b748a',
          username: 'Admin_sonvng',
          avatar: 'https://chingizpro.github.io/portfolio/img/person.png',
          isAdmin: true,
        },
        commentContent:
          'Phim cuốn thật sự, giá mà có bonus thêm 1 tập nữa thì 10đ luôn 😘',
        createAt: '2023-02-28T16:26:20.182Z',
        _id: '63fe2b2cd23ffeabbbf9dd92',
      },
    ],
    __v: 8,
    updatedAt: '2023-02-28T16:26:20.188Z',
  },
  {
    name: 'Khi Phụ Nữ Toả Sáng',
    origin_name: 'Viva Femina',
    thumb_url:
      'https://img.hiephanhthienha.com/uploads/movies/khi-phu-nu-toa-sang-thumb.jpg',
    poster_url:
      'https://img.hiephanhthienha.com/uploads/movies/khi-phu-nu-toa-sang-poster.jpg',
    type: 'series',
    slug: 'khi-phu-nu-toa-sang',
    year: 2023,
    country: 'Trung Quốc',
    content:
      'Khi Phụ Nữ Toả Sáng kể về câu chuyện cuộc đời của ba người phụ nữ với những tính cách khác nhau. Bắt đầu từ một mối quan hệ không thể, họ hỗ trợ nhau thoát khỏi khó khăn và sống một cuộc sống tươi đẹp một cách độc lập.',
    quality: 'FHD',
    lang: 'Vietsub',
    actor: [
      'Yin Tao',
      ' Liu Yi Hao',
      ' Nhiệm Trọng',
      ' Vương Viện Khả',
      ' Kira Shi',
      ' Wang Ce',
      ' Lili. Liu',
      ' Yue YueLi',
      ' Zhang Shu',
    ],
    director: ['Bo You Niou', ' Lin Hong Guang'],
    status: 'ongoing',
    time: '46 phút/tập',
    episode_total: '36 Tập',
    episode_current: 'Tập 32',
    category: ['Tâm Lý', 'Gia Đình'],
    total_view: 200,
  },
  {
    name: 'Hau due mat troi',
    origin_name: 'Viva Femina',
    thumb_url:
      'https://img.hiephanhthienha.com/uploads/movies/khi-phu-nu-toa-sang-thumb.jpg',
    poster_url:
      'https://img.hiephanhthienha.com/uploads/movies/khi-phu-nu-toa-sang-poster.jpg',
    type: 'series',
    slug: 'khi-phu-nu-toa-sang',
    year: 2023,
    country: 'Trung Quốc',
    content:
      'Khi Phụ Nữ Toả Sáng kể về câu chuyện cuộc đời của ba người phụ nữ với những tính cách khác nhau. Bắt đầu từ một mối quan hệ không thể, họ hỗ trợ nhau thoát khỏi khó khăn và sống một cuộc sống tươi đẹp một cách độc lập.',
    quality: 'FHD',
    lang: 'Vietsub',
    actor: [
      'Yin Tao',
      ' Liu Yi Hao',
      ' Nhiệm Trọng',
      ' Vương Viện Khả',
      ' Kira Shi',
      ' Wang Ce',
      ' Lili. Liu',
      ' Yue YueLi',
      ' Zhang Shu',
    ],
    director: ['Bo You Niou', ' Lin Hong Guang'],
    status: 'ongoing',
    time: '46 phút/tập',
    episode_total: '36 Tập',
    episode_current: 'Tập 32',
    category: ['Tâm Lý', 'Gia Đình'],
    total_view: 100,
  },
  {
    name: 'Khi Phụ Nữ Toả Sáng',
    origin_name: 'Viva Femina',
    thumb_url:
      'https://img.hiephanhthienha.com/uploads/movies/khi-phu-nu-toa-sang-thumb.jpg',
    poster_url:
      'https://img.hiephanhthienha.com/uploads/movies/khi-phu-nu-toa-sang-poster.jpg',
    type: 'series',
    slug: 'khi-phu-nu-toa-sang',
    year: 2023,
    country: 'Trung Quốc',
    content:
      'Khi Phụ Nữ Toả Sáng kể về câu chuyện cuộc đời của ba người phụ nữ với những tính cách khác nhau. Bắt đầu từ một mối quan hệ không thể, họ hỗ trợ nhau thoát khỏi khó khăn và sống một cuộc sống tươi đẹp một cách độc lập.',
    quality: 'FHD',
    lang: 'Vietsub',
    actor: [
      'Yin Tao',
      ' Liu Yi Hao',
      ' Nhiệm Trọng',
      ' Vương Viện Khả',
      ' Kira Shi',
      ' Wang Ce',
      ' Lili. Liu',
      ' Yue YueLi',
      ' Zhang Shu',
    ],
    director: ['Bo You Niou', ' Lin Hong Guang'],
    status: 'ongoing',
    time: '46 phút/tập',
    episode_total: '36 Tập',
    episode_current: 'Tập 32',
    category: ['Tâm Lý', 'Gia Đình'],
    total_view: 200,
  },
  {
    name: 'Hau due mat troi',
    origin_name: 'Viva Femina',
    thumb_url:
      'https://img.hiephanhthienha.com/uploads/movies/khi-phu-nu-toa-sang-thumb.jpg',
    poster_url:
      'https://img.hiephanhthienha.com/uploads/movies/khi-phu-nu-toa-sang-poster.jpg',
    type: 'series',
    slug: 'khi-phu-nu-toa-sang',
    year: 2023,
    country: 'Trung Quốc',
    content:
      'Khi Phụ Nữ Toả Sáng kể về câu chuyện cuộc đời của ba người phụ nữ với những tính cách khác nhau. Bắt đầu từ một mối quan hệ không thể, họ hỗ trợ nhau thoát khỏi khó khăn và sống một cuộc sống tươi đẹp một cách độc lập.',
    quality: 'FHD',
    lang: 'Vietsub',
    actor: [
      'Yin Tao',
      ' Liu Yi Hao',
      ' Nhiệm Trọng',
      ' Vương Viện Khả',
      ' Kira Shi',
      ' Wang Ce',
      ' Lili. Liu',
      ' Yue YueLi',
      ' Zhang Shu',
    ],
    director: ['Bo You Niou', ' Lin Hong Guang'],
    status: 'ongoing',
    time: '46 phút/tập',
    episode_total: '36 Tập',
    episode_current: 'Tập 32',
    category: ['Tâm Lý', 'Gia Đình'],
    total_view: 100,
  },
  {
    name: 'Khi Phụ Nữ Toả Sáng',
    origin_name: 'Viva Femina',
    thumb_url:
      'https://img.hiephanhthienha.com/uploads/movies/khi-phu-nu-toa-sang-thumb.jpg',
    poster_url:
      'https://img.hiephanhthienha.com/uploads/movies/khi-phu-nu-toa-sang-poster.jpg',
    type: 'series',
    slug: 'khi-phu-nu-toa-sang',
    year: 2023,
    country: 'Trung Quốc',
    content:
      'Khi Phụ Nữ Toả Sáng kể về câu chuyện cuộc đời của ba người phụ nữ với những tính cách khác nhau. Bắt đầu từ một mối quan hệ không thể, họ hỗ trợ nhau thoát khỏi khó khăn và sống một cuộc sống tươi đẹp một cách độc lập.',
    quality: 'FHD',
    lang: 'Vietsub',
    actor: [
      'Yin Tao',
      ' Liu Yi Hao',
      ' Nhiệm Trọng',
      ' Vương Viện Khả',
      ' Kira Shi',
      ' Wang Ce',
      ' Lili. Liu',
      ' Yue YueLi',
      ' Zhang Shu',
    ],
    director: ['Bo You Niou', ' Lin Hong Guang'],
    status: 'ongoing',
    time: '46 phút/tập',
    episode_total: '36 Tập',
    episode_current: 'Tập 32',
    category: ['Tâm Lý', 'Gia Đình'],
    total_view: 200,
  },
  {
    name: 'Hau due mat troi',
    origin_name: 'Viva Femina',
    thumb_url:
      'https://img.hiephanhthienha.com/uploads/movies/khi-phu-nu-toa-sang-thumb.jpg',
    poster_url:
      'https://img.hiephanhthienha.com/uploads/movies/khi-phu-nu-toa-sang-poster.jpg',
    type: 'series',
    slug: 'khi-phu-nu-toa-sang',
    year: 2023,
    country: 'Trung Quốc',
    content:
      'Khi Phụ Nữ Toả Sáng kể về câu chuyện cuộc đời của ba người phụ nữ với những tính cách khác nhau. Bắt đầu từ một mối quan hệ không thể, họ hỗ trợ nhau thoát khỏi khó khăn và sống một cuộc sống tươi đẹp một cách độc lập.',
    quality: 'FHD',
    lang: 'Vietsub',
    actor: [
      'Yin Tao',
      ' Liu Yi Hao',
      ' Nhiệm Trọng',
      ' Vương Viện Khả',
      ' Kira Shi',
      ' Wang Ce',
      ' Lili. Liu',
      ' Yue YueLi',
      ' Zhang Shu',
    ],
    director: ['Bo You Niou', ' Lin Hong Guang'],
    status: 'ongoing',
    time: '46 phút/tập',
    episode_total: '36 Tập',
    episode_current: 'Tập 32',
    category: ['Tâm Lý', 'Gia Đình'],
    total_view: 100,
  },
  {
    name: 'Khi Phụ Nữ Toả Sáng',
    origin_name: 'Viva Femina',
    thumb_url:
      'https://img.hiephanhthienha.com/uploads/movies/khi-phu-nu-toa-sang-thumb.jpg',
    poster_url:
      'https://img.hiephanhthienha.com/uploads/movies/khi-phu-nu-toa-sang-poster.jpg',
    type: 'series',
    slug: 'khi-phu-nu-toa-sang',
    year: 2023,
    country: 'Trung Quốc',
    content:
      'Khi Phụ Nữ Toả Sáng kể về câu chuyện cuộc đời của ba người phụ nữ với những tính cách khác nhau. Bắt đầu từ một mối quan hệ không thể, họ hỗ trợ nhau thoát khỏi khó khăn và sống một cuộc sống tươi đẹp một cách độc lập.',
    quality: 'FHD',
    lang: 'Vietsub',
    actor: [
      'Yin Tao',
      ' Liu Yi Hao',
      ' Nhiệm Trọng',
      ' Vương Viện Khả',
      ' Kira Shi',
      ' Wang Ce',
      ' Lili. Liu',
      ' Yue YueLi',
      ' Zhang Shu',
    ],
    director: ['Bo You Niou', ' Lin Hong Guang'],
    status: 'ongoing',
    time: '46 phút/tập',
    episode_total: '36 Tập',
    episode_current: 'Tập 32',
    category: ['Tâm Lý', 'Gia Đình'],
    total_view: 200,
  },
  {
    name: 'Hau due mat troi',
    origin_name: 'Viva Femina',
    thumb_url:
      'https://img.hiephanhthienha.com/uploads/movies/khi-phu-nu-toa-sang-thumb.jpg',
    poster_url:
      'https://img.hiephanhthienha.com/uploads/movies/khi-phu-nu-toa-sang-poster.jpg',
    type: 'series',
    slug: 'khi-phu-nu-toa-sang',
    year: 2023,
    country: 'Trung Quốc',
    content:
      'Khi Phụ Nữ Toả Sáng kể về câu chuyện cuộc đời của ba người phụ nữ với những tính cách khác nhau. Bắt đầu từ một mối quan hệ không thể, họ hỗ trợ nhau thoát khỏi khó khăn và sống một cuộc sống tươi đẹp một cách độc lập.',
    quality: 'FHD',
    lang: 'Vietsub',
    actor: [
      'Yin Tao',
      ' Liu Yi Hao',
      ' Nhiệm Trọng',
      ' Vương Viện Khả',
      ' Kira Shi',
      ' Wang Ce',
      ' Lili. Liu',
      ' Yue YueLi',
      ' Zhang Shu',
    ],
    director: ['Bo You Niou', ' Lin Hong Guang'],
    status: 'ongoing',
    time: '46 phút/tập',
    episode_total: '36 Tập',
    episode_current: 'Tập 32',
    category: ['Tâm Lý', 'Gia Đình'],
    total_view: 100,
  },
  {
    name: 'Khi Phụ Nữ Toả Sáng',
    origin_name: 'Viva Femina',
    thumb_url:
      'https://img.hiephanhthienha.com/uploads/movies/khi-phu-nu-toa-sang-thumb.jpg',
    poster_url:
      'https://img.hiephanhthienha.com/uploads/movies/khi-phu-nu-toa-sang-poster.jpg',
    type: 'series',
    slug: 'khi-phu-nu-toa-sang',
    year: 2023,
    country: 'Trung Quốc',
    content:
      'Khi Phụ Nữ Toả Sáng kể về câu chuyện cuộc đời của ba người phụ nữ với những tính cách khác nhau. Bắt đầu từ một mối quan hệ không thể, họ hỗ trợ nhau thoát khỏi khó khăn và sống một cuộc sống tươi đẹp một cách độc lập.',
    quality: 'FHD',
    lang: 'Vietsub',
    actor: [
      'Yin Tao',
      ' Liu Yi Hao',
      ' Nhiệm Trọng',
      ' Vương Viện Khả',
      ' Kira Shi',
      ' Wang Ce',
      ' Lili. Liu',
      ' Yue YueLi',
      ' Zhang Shu',
    ],
    director: ['Bo You Niou', ' Lin Hong Guang'],
    status: 'ongoing',
    time: '46 phút/tập',
    episode_total: '36 Tập',
    episode_current: 'Tập 32',
    category: ['Tâm Lý', 'Gia Đình'],
    total_view: 200,
  },
  {
    name: 'Hau due mat troi',
    origin_name: 'Viva Femina',
    thumb_url:
      'https://img.hiephanhthienha.com/uploads/movies/khi-phu-nu-toa-sang-thumb.jpg',
    poster_url:
      'https://img.hiephanhthienha.com/uploads/movies/khi-phu-nu-toa-sang-poster.jpg',
    type: 'series',
    slug: 'khi-phu-nu-toa-sang',
    year: 2023,
    country: 'Trung Quốc',
    content:
      'Khi Phụ Nữ Toả Sáng kể về câu chuyện cuộc đời của ba người phụ nữ với những tính cách khác nhau. Bắt đầu từ một mối quan hệ không thể, họ hỗ trợ nhau thoát khỏi khó khăn và sống một cuộc sống tươi đẹp một cách độc lập.',
    quality: 'FHD',
    lang: 'Vietsub',
    actor: [
      'Yin Tao',
      ' Liu Yi Hao',
      ' Nhiệm Trọng',
      ' Vương Viện Khả',
      ' Kira Shi',
      ' Wang Ce',
      ' Lili. Liu',
      ' Yue YueLi',
      ' Zhang Shu',
    ],
    director: ['Bo You Niou', ' Lin Hong Guang'],
    status: 'ongoing',
    time: '46 phút/tập',
    episode_total: '36 Tập',
    episode_current: 'Tập 32',
    category: ['Tâm Lý', 'Gia Đình'],
    total_view: 100,
  },
]
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        title: 'Tên phim',
        align: 'start',
        sortable: false,
        key: 'name',
      },
      { title: 'Thumbnail', key: 'thumb_url', sortable: false },
      { title: 'Thể loại', key: 'type', sortable: false },
      { title: 'Quốc gia', key: 'country', sortable: false },
      { title: 'Lượt xem', key: 'total_view' },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      thumb_url: 0,
      type: 0,
      country: 0,
      total_view: 0,
    },
    defaultItem: {
      name: '',
      thumb_url: 0,
      type: 0,
      country: 0,
      total_view: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.desserts = data
    },

    editItem(item) {
      navigateTo('/movie/edit/')
      // this.editedIndex = this.desserts.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      // this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<style scoped lang="scss">
@use 'sass:map';
</style>
