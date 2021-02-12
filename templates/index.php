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
                    <img src="img/bresenham.png" class="right" width="40%" style="margin:0 1em 0 2em;">
                    <h3><a href="bresenham.php">Algoritmo de rasterização de retas: Bresenham</a></h3>
                    <p>O algoritmo de rasterização de retas de Bresenham, assim como o <spam><a src ="dda.php">DDA</a></spam>, a partir de duas posições no espaço gera um conjunto discreto de pontos ligando essas posições (basicamente nos diz...<a href="bresenham.php">Veja mais</a></p>
                </div>
                <div class="bloco">
                    <img src="img/scanline.png" class="left" width="49%" style="margin:0 1em 0 2em;">
                    <a herf="scanline.php" ><h3>Alogritmo de rasterização de triangulos: Scanline</h3></a>
                    <p> O algoritmo de rasterização de triangulo por scanline é um algoritmo eficiente que determina que pixels fazem parte de um triangulo, percorrendo esses pixels e apenas uma vez cada...<a href="scanline.php">Veja mais</a></p>
                </div>
            </div>
        </div>
        <!-- javascript -->
        <script src="./js/esferas.js"></script>
    </body>
</html>
