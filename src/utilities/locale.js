export default function getLocale(){
    let language = navigator.language
    return language&&language.length === 2 ? language.split('-'):['en', 'CA']
}