<?php

if (!isset($_POST['question'])) {
    if (isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['type'])) {
        $to = 'ksh@clodumill.ru';
        $subject = 'Заявка с сайта cmk24.ru';
        $message = 'Имя: ' . $_POST['name'] . '<br> Номер телефона: ' . $_POST['phone'] . '<br> Тип заявки: ' . $_POST['type'];
        $headers  = "Content-type: text/html; charset=utf-8 \r\n";
        mail($to, $subject, $message, $headers);
        echo json_encode(['success' => true]);
    }
} else {
    if (isset($_POST['name']) && isset($_POST['mail']) && isset($_POST['question']) && isset($_POST['type'])) {
        $to = 'ksh@clodumill.ru';
        $subject = 'Заявка с сайта cmk24.ru';
        $message = 'Имя: ' . $_POST['name'] . '<br> Адрес электронной почты: ' . $_POST['mail'] . '<br> Ваш вопрос: ' . $_POST['question'] . '<br> Тип заявки: ' . $_POST['type'];
        $headers  = "Content-type: text/html; charset=utf-8 \r\n";
        mail($to, $subject, $message, $headers);
        echo json_encode(['success' => true]);
    }
}