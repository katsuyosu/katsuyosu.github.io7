$(function () {
  const page_type = $(".contents").attr("id");
  const categorys = ["men", "woman", "kids"];
  // オブジェクトをHTML化
  // 返り値：html
  function createDom(items) {
    let html_template = "";
    items.forEach((item, index) => {
      html_template += `<li class="item">
      <a href="detail.html">
        <div class="item-cap">
          <img src="./img/item/${item["id"]}.png" loading="lazy" />
        </div>
        <div class="item-info">
          <h3 class="item-name">${item.name}</h3>
          <h3 class="item-text">
          ${item["text"]}
          </h3>
          <div class="item-price">¥${item.price}</div>
        </div>
      </a>
    </li>`;
    });
    return html_template;
    // 結果から考える
  }
  // HTML化ここまで
  // newがtrueになっているものを返す
  function getItemList(key, value = null) {
    const items = item_data.filter(function (item, index) {
      switch (key) {
        case "category":
          return item[key] == value;
          break;
        case "new":
          return item["new"];
          break;
      }
    });
    return items;
  }
  // newがtrueになっているものを返すここまで

  // ピックアップランダム関数
  function pickUpShuffle(item_data) {
    items = [];
    let rand_check = [];
    for (let i = 0; i < 6; i++) {
      let j = Math.floor(Math.random() * item_data.length);
      if (rand_check.indexOf(j) !== -1) {
        i--;
        continue;
      } else {
        rand_check.push(j);
        items.push(item_data[j]);
      }
    }
    return items;
  }
  // ピックアップランダム関数ここまで

  // トップスライダー
  $(".top-slider").slick({
    autoplay: true,
    arrow: true,
    dots: true,
    speed: 1500,
    easing: "swing",
    centerMode: true,
    centerPadding: "25%",
    prevArrow: '<div class="slide-btn prev-btn"></div>',
    nextArrow: '<div class="slide-btn next-btn"></div>',
    responsive: [
      {
        breakpoint: 769,
        settings: {
          centerPadding: "0%",
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
  // トップスライダーここまで
  // ハンバーガーメニュー
  $(".menu-trigger").on("click", function () {
    $(this).toggleClass("is-active");
    $(".header-links").toggleClass("is-active");
  });
  // ハンバーガーメニューここまで
  // サイズの選択
  $(".item-size-list li").on("click", function () {
    const select_size = $(this).text();
    $(this).addClass("is-active");
    $(this).siblings("li").removeClass("is-active");
    $(".item-size-select span").text(select_size);
  });
  // サイズの選択ここまで
  // レビュー
  let review_num = 0;
  $(".review li").on("click", function () {
    if (review_num === $(".review li").index(this) + 1) {
      $(".review li").removeClass("is-active");
      review_num = 0;
    } else {
      review_num = $(".review li").index(this) + 1;
      $(".review li").removeClass("is-active");
      $(`.review li:lt(${review_num})`).addClass("is-active");
    }
  });
  // レビューここまで
  // 詳細説明文
  $('[data-accordion="trigger"]').on("click", function () {
    $(this).toggleClass("is-active");
    $(this).next().slideToggle();
  });

  $(".sidebar-title").on("click", function () {
    $(this).toggleClass("is-active");
    $(this).next(".sidebar-body").stop().toggle();
  });
  // 詳細説明文ここまで

  // newやman等を出す
  if (page_type == "page-index") {
    let item_list_new = getItemList("new");
    $('[data-item-list="new"').append(createDom(item_list_new));
    categorys.forEach((category) => {
      let item_list_category = getItemList("category", category);
      $(`[data-item-list="${category}"`).append(createDom(item_list_category));
    });
  }
  // newやman等を出すここまで

  // ピックアップ
  let item_list_pickup = createDom(pickUpShuffle(item_data));
  $('[data-item-list="pickup"]').append(item_list_pickup);
  // ピックアップここまで
});

// ローディング
$(window).on("load", function () {
  setTimeout(function () {
    $(".loader").fadeOut();
  }, 600);
});

$(window).on("scroll", function () {
  // ころりん
  if ($(window).scrollTop() > 300) {
    $(".circle-banner").addClass("is-over");
  } else {
    $(".circle-banner").removeClass("is-over");
  }
  if ($(window).scrollTop() > $(".footer").offset().top - 700) {
    $(".circle-banner").removeClass("is-over");
  }
  // フェードイン
  $("[data-fadeIn]").each(function (index, el) {
    if ($(window).scrollTop() > $(el).offset().top - $(window).height()) {
      $(el).addClass("is-over");
    }
  });
});
