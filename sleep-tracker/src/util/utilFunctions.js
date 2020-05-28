export const formatThisDate = (dateEntered, startSleep, endSleep) => {
    let month = dateEntered.getMonth() + 1
    let day = dateEntered.getDate()
    let year = dateEntered.getFullYear()

    let day2 = day

    const amHours = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]

    const pmHours = [ 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23 ]

    if (pmHours.includes(startSleep) && amHours.includes(endSleep)) {
        console.log(`it includes ${startSleep}`)
        day2 = day2 + 1
    } else {
        console.log(`Its the same day`)
    }
    
    const timeSlept = Math.abs(new Date(`${year}/${month}/${day} ${startSleep}:00:00`) - new Date(`${year}/${month}/${day2} ${endSleep}:00:00`));

    const totalHours = Math.floor(timeSlept/1000/60/60); 

    return [ `${month}-${day}-${year}`, totalHours ];
}


export const formatThisHour = (militaryHour) => {
    const formatedHours = ["12am", "1am", "2am", "3am", "4am", "5am", "6am", 
                            "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", 
                            "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", 
                            "10pm", "11pm"];
    return formatedHours[militaryHour];
}

export const sortArray = (arr) => {
    return arr.sort((a,b) => a.id-b.id)
}