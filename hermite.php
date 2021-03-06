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
                    <p class="path">Curva de Hermite</p>
                </div>
                <hr>
                <!-- separar conteudo em .blocos -->
                <div class="bloco">
                    <h2>Rasterização de curvas - curva de Hermite</h2>
                    <br>
                    <p>A curva de Hermite, assim como a
                        <a href="bezier.php">curva de Bézier</a>, é um tipo de curva paramétrica.
                        Ela é construida a partir de pontos de controle e
                        vetores tangente associados a cada um desses pontos.
                        A curva de hermite apesar de mais complexa que curva de Bézier tem como vantagem
                        uma maior facilidade em criar conjuntos de curvas continuas pelo controle
                        claro da tangente da curva gerada.
                     </p>
                     <p>Um ponto sobre a curva pode ser encontrado
                         utilizando as seguintes funções de mistura:</p>
                     <br>
                     <div style="display:flex; justify-content: center;">
                         <img alt="Função de blending h1=2*p^(3)-3*p^(2)+1" src="./img/hermite1.png" height="320px">
                         <img alt="Função de blending h2=-2*p^(3)+3*p^(2)"  src="./img/hermite2.png" height="320px">
                     </div>
                     <br>
                     <div style="display:flex; justify-content: center;">
                         <img alt="Função de blending h3=p^(3)-2*p^(2)+p"  src="./img/hermite3.png" height="320px">
                         <img alt="Função de blending h4=p^(3)-p^(2)"  src="./img/hermite4.png" height="320px">
                     </div>
                     <br>
                     <div style="display:flex; justify-content: center;">
                         <img alt="Função de curva C(p) = h1(p)*P0+h2(p)*P1+h3(p)*P0'+h4(p)*P1'"  src="./img/hermiteB.png" width="80%">
                     </div>
                     <br>
                     <p>Em que P0 e P1 são os pontos que delimitam do começo
                         e o fim da curva enquanto P0' e P1' são vetores tangentes
                         a curva em P0 e P1 respectivamente.
                     </p>
                     <p>A Você pode interagir com um exemplo de uma curva de Hermite.</p>
                     <p>(Clique e arraste os pontos para alterar sua posição.)</p>
                    <hr>
                    <h3>Curva de Hermite.</h3>
                    <!-- Canvas Bezier1-->
                    <div id="curva" class="canvasHolder wide tall">   </div>
                    <!-- output do canvas -->
                    <div class="dadosCanvas" id="saidaHermite" >
                    </div>
                    <!-- Controles do canvas -->
                    <div class="controles">
                        <h4 class="sliderTitulo">Progresso:</h4>
                        <div class="sliderHolder">
                            <input type="range" value="95" min="0" max="100" name="status" class="slider" id="sp" value="0">
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
