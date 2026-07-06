$(document).ready(function () {

    /* ========== Menu Mobile ========== */
    $('.menu-toggle').on('click', function () {
        $('.nav-menu').toggleClass('active');
        var isOpen = $('.nav-menu').hasClass('active');
        $(this).html(isOpen ? '&#10005;' : '&#9776;');
    });

    $('.nav-menu a').on('click', function () {
        $('.nav-menu').removeClass('active');
        $('.menu-toggle').html('&#9776;');
    });

    /* ========== Scroll to Top Button ========== */
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {
            $('#scrollTop').addClass('show');
        } else {
            $('#scrollTop').removeClass('show');
        }
    });

    $('#scrollTop').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 500);
    });

    /* ========== Fade In na Rolagem (ScrollReveal) ========== */
    function checkFadeIn() {
        $('.fade-in').each(function () {
            var elementTop = $(this).offset().top;
            var windowBottom = $(window).scrollTop() + $(window).height();
            if (elementTop < windowBottom - 80) {
                $(this).addClass('visible');
            }
        });
    }

    checkFadeIn();

    $(window).on('scroll', function () {
        checkFadeIn();
    });

    /* ========== Animação das Barras de Habilidade ========== */
    function animateSkillBars() {
        $('.skills-bars').each(function () {
            var elementTop = $(this).offset().top;
            var windowBottom = $(window).scrollTop() + $(window).height();
            if (elementTop < windowBottom - 50 && !$(this).hasClass('animated')) {
                $(this).addClass('animated');
                $(this).find('.fill').each(function () {
                    var width = $(this).data('width');
                    $(this).css('width', width + '%');
                });
            }
        });
    }

    animateSkillBars();
    $(window).on('scroll', function () {
        animateSkillBars();
    });

    /* ========== Filtro de Projetos ========== */
    $('.filter-btn').on('click', function () {
        var filter = $(this).data('filter');

        $('.filter-btn').removeClass('active');
        $(this).addClass('active');

        $('.project-card').each(function () {
            var category = $(this).data('category');

            if (filter === 'all' || category === filter) {
                $(this).fadeIn(400).css('display', 'block');
            } else {
                $(this).fadeOut(300);
            }
        });
    });

    /* ========== Validação do Formulário de Contato ========== */
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();
        var isValid = true;

        $('.form-group').removeClass('error success');
        $('.error-msg').text('');

        var nome = $('#nome').val().trim();
        if (nome === '') {
            showError('#nome', 'O nome é obrigatório.');
            isValid = false;
        } else if (nome.length < 3) {
            showError('#nome', 'O nome deve ter pelo menos 3 caracteres.');
            isValid = false;
        } else {
            showSuccess('#nome');
        }

        var email = $('#email').val().trim();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            showError('#email', 'O e-mail é obrigatório.');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('#email', 'Informe um e-mail válido.');
            isValid = false;
        } else {
            showSuccess('#email');
        }

        var telefone = $('#telefone').val().trim();
        if (telefone !== '') {
            var telRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
            if (!telRegex.test(telefone)) {
                showError('#telefone', 'Informe um telefone válido (ex: (11) 99999-8888).');
                isValid = false;
            } else {
                showSuccess('#telefone');
            }
        } else {
            showSuccess('#telefone');
        }

        var assunto = $('#assunto').val();
        if (assunto === '') {
            showError('#assunto', 'Selecione um assunto.');
            isValid = false;
        } else {
            showSuccess('#assunto');
        }

        var mensagem = $('#mensagem').val().trim();
        if (mensagem === '') {
            showError('#mensagem', 'A mensagem é obrigatória.');
            isValid = false;
        } else if (mensagem.length < 10) {
            showError('#mensagem', 'A mensagem deve ter pelo menos 10 caracteres.');
            isValid = false;
        } else {
            showSuccess('#mensagem');
        }

        if (isValid) {
            var btn = $(this).find('button[type="submit"]');
            btn.text('Enviando...').prop('disabled', true);
            setTimeout(function () {
                btn.text('Mensagem Enviada!').css('background', '#2ecc71');
                $('#contactForm')[0].reset();
                $('.form-group').removeClass('success');
                setTimeout(function () {
                    btn.text('Enviar Mensagem').css('background', '').prop('disabled', false);
                }, 3000);
            }, 1000);
        }
    });

    function showError(inputId, message) {
        $(inputId).closest('.form-group').addClass('error').find('.error-msg').text(message);
    }

    function showSuccess(inputId) {
        $(inputId).closest('.form-group').addClass('success');
    }

    /* ========== Efeito Hover nos Cards (jQuery) ========== */
    $('.project-card, .skill-card').on({
        mouseenter: function () {
            $(this).css('transform', 'translateY(-8px)');
        },
        mouseleave: function () {
            $(this).css('transform', 'translateY(0)');
        }
    });

});
