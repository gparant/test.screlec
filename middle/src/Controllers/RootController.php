<?php
namespace Screlec\Middle\Controllers;

use Mouf\Mvc\Splash\Annotations\Get;
use Mouf\Mvc\Splash\Annotations\Post;
use Mouf\Mvc\Splash\Annotations\Put;
use Mouf\Mvc\Splash\Annotations\Delete;
use Mouf\Mvc\Splash\Annotations\URL;
use Mouf\Html\Template\TemplateInterface;
use Mouf\Html\HtmlElement\HtmlBlock;
use \Twig_Environment;
use Mouf\Html\Renderer\Twig\TwigTemplate;
use Mouf\Mvc\Splash\HtmlResponse;
use Zend\Diactoros\Response\JsonResponse;

/**
 * TODO: write controller comment
 */
class RootController {

    /**
     * The template used by this controller.
     * @var TemplateInterface
     */
    private $template;

    /**
     * The main content block of the page.
     * @var HtmlBlock
     */
    private $content;

    /**
     * The Twig environment (used to render Twig templates).
     * @var Twig_Environment
     */
    private $twig;


    /**
     * Controller's constructor.
     * @param TemplateInterface $template The template used by this controller
     * @param HtmlBlock $content The main content block of the page
     * @param Twig_Environment $twig The Twig environment (used to render Twig templates)
     */
    public function __construct(TemplateInterface $template, HtmlBlock $content, Twig_Environment $twig) {
        $this->template = $template;
        $this->content = $content;
        $this->twig = $twig;
    }

    /**
     * @URL("/")

     */
    public function index() {
        // Let's add the twig file to the template.
        $this->content->addHtmlElement(new TwigTemplate($this->twig, 'views/root/index.twig', array("message"=>"world")));

        return new HtmlResponse($this->template);
    }

    /**
     * @URL("/user/current/")
     */
    public function userCurent(){
        return new JsonResponse(array(
            [
                "rights" => ["CRM", "INVOICE", "DEMANDE", "CONTRACT"],
                "notificationList" => [
                    ["company_id" => "foo-company-id", "content" => "FooContent", "app_id" => "foo-app"],
                    ["company_id" => "baz-company-id", "content" => "BazContent", "app_id" => "baz-app"],
                    ["company_id" => "nurf-company-id", "content" => "NurfContent", "app_id" => "nurf-app"],
                    ["company_id" => "xorf-company-id", "content" => "XorfContent", "app_id" => "xorf-app"],
                    ["company_id" => "gyn-company-id", "content" => "GynContent", "app_id" => "gyn-app"],
                    ["company_id" => "foo-company-id", "content" => "fikngsjn", "app_id" => "foo-app"]
                ],
                "firstname" => "FooName",
                "name" => "FooFirstname",
                "email" => "Foo@thecodingmachine.com"
            ]
        ));
    }

    /**
     * @URL("/user/")
     * @Get()
     *
     */
    public function users(){
        return new JsonResponse(array(
            "total"=>4,
                "meta"=>[
                    [
                        "id" => 1,
                        "firstname" => "FooName",
                        "name" => "FooFirstname",
                        "email" => "Foo@thecodingmachine.com"
                    ],
                    [
                        "id" => 2,
                        "firstname" => "FooName",
                        "name" => "FooFirstname",
                        "email" => "Foo@thecodingmachine.com"
                    ],
                    [
                        "id" => 3,
                        "firstname" => "FooName",
                        "name" => "FooFirstname",
                        "email" => "Foo@thecodingmachine.com"
                    ],
                    [
                        "id" => 4,
                        "firstname" => "FooName",
                        "name" => "FooFirstname",
                        "email" => "Foo@thecodingmachine.com"
                    ]
                ]
        ));
    }

    /**
     * @URL("/user")
     * @Post()
     *
     * @param string $name
     * @param string $firstname
     * @param string $email
     * @return JsonResponse
     */
    public function test(string $name, string $firstname, string $email){
        return new JsonResponse(array(
           "return"=>["user"=>
                   [
                   "name"=>$name,
                    "firstname"=>$firstname,
                    "email"=>$email
                    ]
               ]
        ));
    }
}
