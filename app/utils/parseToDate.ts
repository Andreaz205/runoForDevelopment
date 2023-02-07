export const parseToDate = (date: string) => {
    let newDate = date.split('T')[0]
    console.log(newDate)
    let resultArray = newDate.split('-')
    console.log(resultArray)
    return resultArray[2] + '.' + resultArray[1] + '.' + resultArray[0]
}