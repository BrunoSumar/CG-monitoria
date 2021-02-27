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

                <!-- Breadcrumbs -->
                <div class="breadcrumbs">
                    <a class="path" href="./index.php">Home</a> /
                    <a class="path" href="./rasterizacao.php">Rasterização</a> /
                    <p class="path">Curvas</p>
                </div>
                <hr>
                <!-- separar conteudo em .blocos -->
                <div class="bloco">
                    <h2>Rasterização de curvas</h2>
                     <p></p>

                     <pre class="codigo">
                    </pre>
                    <p>Clique nos Pontos para alterar seus valores.</p>

                    <!-- Canvas Bezier1-->
                    <div id="curva1" class="canvasHolder wide tall">   </div>
                    <!-- output do canvas -->
                    <div class="dadosCanvas" id="saidaSL" >
                    </div>
                    <!-- Controles do canvas -->
                    <div class="controles">
                        <h4 class="sliderTitulo">Progresso:</h4>
                        <div class="sliderHolder">
                            <input type="range" value="0" min="0" max="100" name="status" class="slider" id="spB1" value="0">
                        </div>
                        <label for="paB1" class="checkTitulo"><h4>Progresso automático:</h4></label>
                        <div class="checkHolder" >
                            <input class="check" type="checkbox" name="pAuto" id="paB1" checked="true">
                        </div>
                    </div>

                    <!-- Canvas Bezier2 -->
                    <div id="curva2" class="canvasHolder wide tall">   </div>
                    <!-- output do canvas -->
                    <div class="dadosCanvas" >
                    </div>
                    <!-- Controles do canvas -->
                    <div class="controles">
                        <h4 class="sliderTitulo">Progresso:</h4>
                        <div class="sliderHolder">
                            <input type="range" value="0" min="0" max="100" name="status" class="slider" id="spB2">
                        </div>
                        <label for="paB2" class="checkTitulo"><h4>Progresso automático:</h4></label>
                        <div class="checkHolder" >
                            <input class="check" type="checkbox" name="pAuto" id="paB2" checked="true" checked="true">
                        </div>
                    </div>

                    <!-- Canvas Bezier3 -->
                    <div id="curva3" class="canvasHolder wide tall">   </div>
                    <!-- output do canvas -->
                    <div class="dadosCanvas"  >
                    </div>
                    <!-- Controles do canvas -->
                    <div class="controles">
                        <h4 class="sliderTitulo">Progresso:</h4>
                        <div class="sliderHolder">
                            <input type="range" value="0" min="0" max="100" name="status" class="slider" id="spB3" value="0">
                        </div>
                        <label for="paB3" class="checkTitulo"><h4>Progresso automático:</h4></label>
                        <div class="checkHolder" >
                            <input class="check" type="checkbox" name="pAuto" id="paB3" checked="true">
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- javascript -->
        <script src="./js/base.js"></script>
        <script src="./js/curva1.js"></script>


    </body>
</html>
