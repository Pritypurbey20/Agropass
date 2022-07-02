export const regex = {
        namePattern:"^[a-zA-Z ]*$",
        emailPattern:"^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
        panCardPattern:"[A-Z]{5}[0-9]{4}[A-Z]{1}",
        phoneNumberPattern:"^((\\+91-?)|0)?[0-9]{10}$",
        onlyNumber:"^[0-9]*$",
        aadharNumber:"^[0-9]{12 | 16}*$",
        aalphaNumeric:"^[a-zA-Z0-9_]*$",
        photoVerifynumberOne:1000,
        photoVerifynumberTwo:9000,
        latlongRegex : "^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$"
}