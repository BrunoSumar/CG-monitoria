<!DOCTYPE html>
<html lang="pt" dir="ltr">
    <head>
        <script src="./p5/p5.js"></script>
        <script src="./p5/p5.dom.min.js"></script>
        <script src="./p5/p5.sound.min.js"></script>
        <meta charset="utf-8">
        <title>Curvas de Hermite - CG monitoria</title>
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
                <!-- Breadcrumbs -->
                <div class="breadcrumbs">
                    <a class="path" href="./index.php">Home</a> /
                    <a class="path" href="./rasterizacao.php">Rasterização</a> /
                    <p class="path">Curvas</p>
                </div>
                <hr>
                <!-- separar conteudo em .blocos -->
                <div class="bloco">
                    <h2>Rasterização de curvas - curva de Hermite</h2>
                     <p>A curva de Bézier é um tipo de curva
                         paramétrica que é construida através da
                         interpolação de alguns pontos de controle.
                         De forma geral podemos descrever uma curva
                         de Bézier de ordem n, usando a seguinte expressão:
                     </p>
                     <div style="display:flex; justify-content: center;">
                     <img  src="./img/bezier1.png" height="100px">
                     </div>
                     <p>(Clique e arraste os pontos para alterar sua posição.)</p>
                    <hr>
                    <h3>Curva de Bézier de grau 1.</h3>
                    <!-- Canvas Bezier1-->
                    <div id="curva" class="canvasHolder wide tall">   </div>
                    <!-- output do canvas -->
                    <div class="dadosCanvas" id="saidaHermite" >
                    </div>
                    <!-- Controles do canvas -->
                    <div class="controles">
                        <h4 class="sliderTitulo">Progresso:</h4>
                        <div class="sliderHolder">
                            <input type="range" value="0" min="0" max="100" name="status" class="slider" id="sp" value="0">
                        </div>
                        <label for="pa" class="checkTitulo"><h4>Progresso automático:</h4></label>
                        <div class="checkHolder" >
                            <input class="check" type="checkbox" name="pAuto" id="pa" checked="true">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- javascript -->
        <script src="./js/base.js"></script>
        <script src="./js/hermite.js"></script>


    </body>
</html>
