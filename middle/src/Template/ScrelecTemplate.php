<?php
namespace Screlec\Middle\Template;

use Mouf\Html\Template\BaseTemplate\BaseTemplate;
use Mouf\Html\Template\BootstrapTemplate;
use Mouf\Security\UserService\UserServiceInterface;

class ScrelecTemplate extends BootstrapTemplate {

private $userService = null;

    public function __construct(UserServiceInterface $usi) {
        $this->userService = $usi;
        parent::__construct();
    }
}