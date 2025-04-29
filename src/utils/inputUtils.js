export function allowOnlyNumbers(e) {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode < 48 || charCode > 57) {
        e.preventDefault();
    }
}
