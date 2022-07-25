export default class APIHandler {
  constructor() {}

  // TODO: 전체 카드 객체 리스트 반환. 없으면 NULL
  async getCards() {
    const request = new APIReqeust("GET", "/kanban/cards");
    const response = await APIProcessor(request);
    if (response !== "Error") {
      return response.Items;
    } else {
      return null;
    }
  }

  // TODO: 카드 객체 생성/추가 후 ID 반환
  async postCard(cardObj) {
    const request = new APIReqeust("POST", "/kanban/cards", {
      title: cardObj.title,
      category: cardObj.category,
    });
    const response = await APIProcessor(request);
    if (response !== "Error") {
      console.log(response);
      return response.Items;
    } else {
      return null;
    }
  }

  // TODO: ID로 카드 검색 후 내용,카테고리 수정
  async putCard(cardObj) {
    const request = new APIReqeust("PUT", `/kanban/cards/${cardObj.id}`, {
      title: cardObj.title,
      category: cardObj.category,
    });
    const response = await APIProcessor(request);
  }

  // TODO: ID로 카드 검색 후 삭제
  async deleteCard(id) {
    const request = new APIReqeust("DELETE", `/kanban/cards/${id}`);
    await APIProcessor(request);
  }

  // TODO: API 요청 컨테이너. Method, Path, Body 속성
  // TODO: API 호출 함수
}

// TODO: API 요청 컨테이너, Method, Path, Body 속성
const HOST = "https://qdf2dy49nj.execute-api.ap-northeast-2.amazonaws.com/prod";
class APIReqeust {
  constructor(method, path, body = null) {
    this.method = method;
    this.url = HOST + path;
    this.body = body;
  }
}

// TODO: API 호출 함수
// Fetch API는 네트워크 통신을 포함한 리소스 취득을 위한 인터페이스가 정의되어 있습니다.
// XMLHttpRequest와 같은 비슷한 API가 존재합니다만, 새로운 Fetch API는 좀더 강력하고 유연한 조작이 가능합니다
// async await 구현이 편함
const APIProcessor = async (request) => {
  try {
    const response = await fetch(request.url, {
      method: request.method, // *GET, POST, PUT, DELETE 등
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: request.body ? JSON.stringify(request.body) : null, // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
    });
    switch (response.status) {
      case 200:
      case 201:
        return await response.json();
      case 204:
        return null;
      default:
        console.error(await response.json());
        return "Error";
    }
  } catch (e) {
    console.log(e);
  }
};
