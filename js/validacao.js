const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validarEmail(campo) {
    const email = campo.value.trim();

    if (emailRegex.test(email)) {
        campo.style.border = '1px solid green';
        campo.setCustomValidity('');
        return true;
    } else {
        campo.style.border = '2px solid red';
        campo.setCustomValidity('Por favor, insira um endereço de e-mail válido.');
        campo.reportValidity();
        return false;
    }
}

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0, resto;

    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[10])) return false;

    return true;
}

function mascaraCPF(event) {
    let cpf = event.target.value.replace(/\D/g, '');
    if (cpf.length > 11) cpf = cpf.substring(0, 11);

    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    event.target.value = cpf;

    event.target.style.border = validarCPF(cpf) ? '1px solid green' : '2px solid red';
}

document.addEventListener('DOMContentLoaded', () => {
    const campoEmail = document.getElementById('id_email');
    const campoCPF = document.getElementById('id_cpf');

    campoCPF.addEventListener('input', mascaraCPF);
    campoEmail.addEventListener('blur', () => validarEmail(campoEmail));

    const form = document.getElementById('formContato');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Formulário enviado com sucesso!');
        form.reset();
    });
});
