<?php
/**
 * XK Framework
 * 
 * LICENSE
 * 
 * @copyright Copyright (c) 2011 MingDe Technologies CHINA Inc.
 * @version beta0.1
 */

/**
 * 
 * 文件上传类
 * 用于二进制文件上传
 * 
 * @author 冯涛
 * @since 2011-11-3
 */
class Http
{
	/**
	 * 允许的文件类型
	 * @var array
	 * 
	 * @author 冯涛
	 * @since 2011-11-3
	 */
    private $allowTypes     = array('gif','jpg','png','bmp','vsd','dwg');
    
    /**
	 * 上传路径
	 * @var string
	 * 
	 * @author 冯涛
	 * @since 2011-11-3
	 */
    private $uploadPath     = './';
    
    /**
	 * 上传文件大小限制
	 * @var int
	 * 
	 * @author 冯涛
	 * @since 2011-11-3
	 */
    private $maxSize        = 1000000;
    
    /**
	 * 状态码
	 * @var int
	 * 
	 * @author 冯涛
	 * @since 2011-11-3
	 */
    private $msgCode        = NULL;
    
    /**
	 * 上传后的新的文件名称，包含路径名
	 * @var string
	 * 
	 * @author 冯涛
	 * @since 2011-11-3
	 */
	private $newFile		= NULL;
    
    /**
     * 构造方法
     * 
     * @param array $options
     * @return void
     * 
     * @author 冯涛
     * @since 2011-11-3
     */
    public function __construct(array $options = array())
    {
        //取类内的所有变量
        $vars = get_class_vars(get_class($this));
        //设置类内变量
        foreach ($options as $key=>$value) {
            if (array_key_exists($key, $vars)) {
                $this->$key = $value;
            }
        }
    }
	
     /**
     * 文件上传方法
     * 
     * @param array $files
     * @return boolean
     * 
     * @author 冯涛
     * @since 2011-11-3
     */
    public function fileUpload($file, $sysName='')
    {
        $name       = $file['name'];
        $tmpName    = $file['tmp_name'];
        $error      = $file['error'];
        $size       = $file['size'];

        //检查上传文件的大小,类型,上传的目录
        if ($error > 0) {
            $this->msgCode = $error;
            return false;
        } elseif (!$this->checkType($name)) {
            return false;
        } elseif (!$this->checkSize($size)) {
            return false;
        } elseif (!$this->checkUploadFolder($sysName)) {
            return false;
        } 

        $newFile = $this->uploadPath . '/' . $this->randFileName($name);

        //复制文件到上传目录
        if (!is_uploaded_file($tmpName)) {
            $this->msgCode = -3;
            return false;
        } elseif(@move_uploaded_file($tmpName, $newFile)) {
            $this->msgCode = 0;
            
            if(strpos($newFile, '..') == 0)
            {
            	$newFile = substr($newFile, 2);
            }
            
            $this->newFile = $newFile;
            return true;
        } else {
            $this->msgCode = -3;
            return false;
        }
    }

    /**
    * 检查上传文件的大小有没有超过限制
    *
    * @var int $size
    * @return boolean
    * 
    * @author 冯涛
    * @since 2011-11-3
    */
    private function checkSize($size)
    {
        if ($size > $this->maxSize) {
            $this->msgCode = -2;
            return false;
        } else {
            return true;
        }
    }

    /**
    * 检查上传文件的类型
    *
    * @var string $fileName
    * @return boolean
    * 
	* @author 冯涛
    * @since 2011-11-3
    */
    private function checkType($fileName)
    {
        $arr = explode(".", $fileName);
        $type = end($arr);
        if (in_array(strtolower($type), $this->allowTypes)) {
            return true;
        } else {
            $this->msgCode = -1;
            return false;
        }
    }

    /**
    * 检查上传的目录是否存在,如不存在尝试创建
    *
    * @return boolean
    * 
    * @author 冯涛
    * @since 2011-11-3
    */
    private function checkUploadFolder($sysName='')
    {
        if (null === $this->uploadPath) {
            $this->msgCode = -5;
            return false;
        }
        
        $this->uploadPath = rtrim($this->uploadPath,'/');
        $this->uploadPath = rtrim($this->uploadPath,'\\');
        //TODO 斜杠问题
        if(!empty($sysName)){
        	$this->uploadPath .= '/'.$sysName;
        }
		$this->uploadPath .='/'. date('Ymd');
		
		return $this->mkdir($this->uploadPath);
    }
	
    /**
     * 目录生成
     *
     * @param 	string $path 	目录标识(ftp)
     * @return	boolean
     *
     * @author 冯涛
     * @since 2012-05-26
     */
    public function mkdir($dir)
    {
    	if (!file_exists($dir)){
    		
    		$result = FALSE;
    		
    		//判断该目录的上级目录是否存在，如果不存在，递归创建
    		if(!file_exists(dirname($dir))){
    			$result = $this->mkdir(dirname($dir));
    			if(!$result)
    				return FALSE;
    		}
    		
    		$oldmask = umask(0);
    		$result = mkdir($dir);
    		umask($oldmask);
    		
    		if(!$result)
    		{
    			// 创建文件夹失败
    			$this->msgCode = -4;
    			return FALSE;
    		}
    		 
    		return TRUE;
    		 
    	} elseif(!is_writable($dir)) {
    		$this->msgCode = -6;
    		return FALSE;
    	} else {
    		return TRUE;
    	}
    }
    
    /**
    * 生成随机文件名
    * 
    * @var string $fileName
    * @return string
    * 
    * @author 冯涛
    * @since 2011-11-3
    */
    private function randFileName($fileName)
    {
        list($name,$type) = explode(".",$fileName);
		
        $newFile = 'MingDe'.'_'.date('YmdHis');
        
        return $newFile . '_' . mt_rand() . '.' . $type;
    }

    /**
    * 取上传的结果和信息
    *
    * @return array
    * 
    * @author 冯涛
    * @since 2011-11-3
    */
    public function getStatus()
    {
        $messages = array(
            4   => "没有文件被上传",
            3   => "文件只被部分上传",
            2   => "上传文件超过了HTML表单中MAX_FILE_SIZE选项指定的值",
            1   => "上传文件超过了php.ini 中upload_max_filesize选项的值",
            0   => "上传成功",
            -1  => "末充许的类型",
            -2  => "文件过大，上传文件不能超过{$this->maxSize}个字节",
			-3  => "上传失败",
            -4  => "建立存放上传文件目录失败，请重新指定上传目录",
            -5  => "必须指定上传文件的路径",
            -6	=> "指定的文件目录没有写权限"
        );

        return array('error'=>$this->msgCode, 'message'=>$messages[$this->msgCode], 'file'=>$this->newFile);
    }
}