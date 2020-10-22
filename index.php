<!DOCTYPE html>
<html lang="pt" dir="ltr">
    <head>
        <script src="./p5/p5.js"></script>
        <script src="./p5/p5.dom.min.js"></script>
        <script src="./p5/p5.sound.min.js"></script>
        <meta charset="utf-8">
        <title>Home - CG monitoria</title>
        <link rel="stylesheet" href="./css/base.css">
    </head>
    <body>
        <!-- Lateral -->
        <?php
            echo file_get_contents("./sidebar.html", false, NULL, 0, 70000) ;
        ?>
        <!-- Centro -->
        <div id="principal">
            <div id="conteudo">
                <div class="bloco">
                    <div id="canvasEsfera" class="canvasHolder left"></div>
                    <h3>Bem vindo ao CG monitoria!</h3>
                    <p>Esse site é o projeto para monitoria voluntária de computação gráfica da UFF-RO.
                    O objetivo principal é servir de complemento às aulas oferecendo exemplos interativos referentes aos principais temas da disciplina.</p>
                </div>
                <hr>
                <h2>Exemplos</h2>
                <div class="bloco">
                    <div id="canvas2" class="canvasHolder  right"></div>
                    <h3>Exemplo dummy1!</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <a href="#">Veja mais</a>
                </div>
                <div class="bloco">
                    <div id="canvas3" class="canvasHolder left" ></div>
                    <h3>Exemplo dummy2!</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut laborsde et dolore magna aliqua.</p>
                    <a href="#">Veja mais</a>
                </div>
            </div>
        </div>
        <!-- javascript -->
        <script src="./js/esferas.js"></script>
    </body>
</html>
