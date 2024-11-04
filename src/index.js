// TODO: 이 곳에 정답 코드를 작성해주세요.
// 1. 페이지가 로드 된 시점에 ID 입력 창에 Focus가 되어 있어야 합니다.
const $id = document.getElementById('id')
const $idMsg = document.getElementById('id-msg')
// 2. 유효성 검사 로직
const $pw = document.getElementById('pw')
const $pwMsg = document.getElementById('pw-msg')
const $pwCheck = document.getElementById('pw-check')
const $pwCheckMsg = document.getElementById('pw-check-msg')
const ID_REGEX = new RegExp('^[a-z0-9_-]{5,20}$')
const PW_REGEX = new RegExp('^[a-zA-Z0-9_-]{8,16}$')

const ERROR_MSG = {
    required: '필수 정보입니다.',
    invalidId:
        '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
    invalidPw: '8~16자 영문 대 소문자, 숫자를 사용하세요.',
    invalidPwCheck: '비밀번호가 일치하지 않습니다.',
}

document.addEventListener('DOMContentLoaded', () => {
    if ($id) {
        $id.focus()
    }
})

const checkRegex = (target) => {
    const { value, id } = target
    if (value.length === 0) {
        return 'required'
    } else {
        switch (id) {
            case 'id':
                return ID_REGEX.test(value) ? true : 'invalidId'
            case 'pw':
                return PW_REGEX.test(value) ? true : 'invalidPw'
            case 'pw-check':
                return $pw.value === $pwCheck.value ? true : 'invalidPwCheck'
        }
    }
}

const checkValidation = (target, msgTarget) => {
    // 모든 필드의 값은 빠짐 없이 입력해야 합니다.
    // ID: 5~20자. 영문 소문자, 숫자. 특수기호(_),(-)만 사용 가능
    const isValid = checkRegex(target)

    // 3. 커스텀 에러 메세지
    // (1) 비어 있을 때 : input 태그에 border-red-600 class 추가
    // (2) 유효하지 않을 때
    if (isValid !== true) {
        target.classList.add('border-red-600')
        msgTarget.innerText = ERROR_MSG[isValid]
    } else {
        target.classList.remove('border-red-600')
        msgTarget.innerText = ''
    }

    return isValid
}

$id.addEventListener('focusout', () => checkValidation($id, $idMsg))

$pw.addEventListener('focusout', () => checkValidation($pw, $pwMsg))

$pwCheck.addEventListener('focusout', () =>
    checkValidation($pwCheck, $pwCheckMsg)
)

// 입력 확인 모달 창 구현
const $submit = document.getElementById('submit')
const $modal = document.getElementById('modal')

$submit.addEventListener('click', (e) => {
    e.preventDefault()
    if (
        checkValidation($id, $idMsg) === true &&
        checkValidation($pw, $pwMsg) === true &&
        checkValidation($pwCheck, $pwCheckMsg) === true
    ) {
        const $confirmId = document.getElementById('confirm-id')
        const $confrimPw = document.getElementById('confirm-pw')
        $confirmId.innerText = $id.value
        $confrimPw.innerText = $pw.value
        $modal.showModal()
    }
})

// 취소하기, 가입하기 클릭시 eventhandler 구현
const $cancelBtn = document.getElementById('cancel-btn')
const $approveBtn = document.getElementById('approve-btn')

$cancelBtn.addEventListener('click', () => {
    $modal.close()
})

$approveBtn.addEventListener('click', () => {
    $modal.close()
    window.alert('가입되었습니다 🥳')
})

// 폰트 사이즈 조절
const $increaseFontBtn = document.getElementById('increase-font-btn')
const $decreaseFontBtn = document.getElementById('decrease-font-btn')
const $html = document.documentElement
const MAX_FONT_SIZE = 20
const MIN_FONT_SIZE = 12

$increaseFontBtn.addEventListener('click', () => {
    onClickFontsizeControl('increase')
})

$decreaseFontBtn.addEventListener('click', () => {
    onClickFontsizeControl('decrease')
})

const onClickFontsizeControl = (flag) => {
    const curFontSize = parseFloat(window.getComputedStyle($html).fontSize)
    let nextFontSize = flag === 'increase' ? curFontSize + 1 : curFontSize - 1
    $html.style.fontSize = nextFontSize

    $increaseFontBtn.disabled = nextFontSize >= MAX_FONT_SIZE
    $decreaseFontBtn.disabled = nextFontSize <= MIN_FONT_SIZE
}
