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
                <!-- separar conteudo em .blocos -->
                <div class="breadcrumbs">
                    <a class="path" href="./index.php">Home</a> /
                    <p class="path">Rasterização</p>
                </div>
                <hr>
                <div class="bloco">
                    <h2>Rasterizaçao</h2>
                    <p>Rasterizar é levar os dados de um universo continuo (vetorial) para um sistema discreto (pixels). A seguir há uma lista com exemplos  de alguns algoritmos simples de rasterização.</p>
                    <hr>
                    <h4>Algoritmos:</h4>
                    <ul>
                        <h5 id="retas">Retas:</h5>
                        <li><a href="dda.php">DDA</a></li>
                        <li><a href="bresenham.php">Bresenham</a></li>
                        <h5 id="triangulos">Triângulos:</h5>
                        <li><a href="scanline.php">Scanline</a></li>
                        <h5 id="curvas">Curvas:</h5>
                        <li><a href="bezier.php">Curva de Bézier</a></li>
                        <li><a href="hermite.php">Curva de Hermite</a></li>
                    </ul>
                </div>
            </div>
        </div>

    </body>
</html>
