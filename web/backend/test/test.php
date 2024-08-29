<?php
class A
{
    public $a1; 
    protected $a2;

    function __construct($a1, $a2 = 0)
    {
        $this->a1 = $a1;
        $this->a2 = $a2; 
        echo 2;
    }

    function __destruct()
    {
        $this->a1 = null; 
        $this->a2 = null; 
        echo 3;
    }

    function F1()
    {
        echo "<br>{$this->a1} - {$this->a2}";
    }
}

$x1 = new A(2, 4); 
$x1->F1(); 
$x1 = new A(3); 
$x1->F1();
?>
